import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import db from "@repo/db/client"
import bcrypt from "bcrypt"
import { AuthType } from "@prisma/client"

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: "Name", type: "text", placeholder: "name" },
                email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
                phone: { label: "Phone", type: "text", placeholder: "your phone number" },
                password: { label: "Password", type: "password" },

            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error("Missing credentials");
                }

                const { name, email, phone, password } = credentials;
                if (!name || !email || !phone || !password) {
                    console.error("All fields are required");
                    return null; // Prevent session creation if fields are missing
                }

                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await db.user.findFirst({
                    where: {
                        OR: [
                            { number: credentials.phone },
                            { email: credentials.email },
                        ],
                    },
                });
                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id,
                            name: existingUser.name,
                            phone: existingUser.number,
                            email: existingUser.email
                        }
                    }
                    return null;
                }
                try {
                    const user = await db.user.create({
                        data: {
                            name: credentials.name,
                            email: credentials.email,
                            number: credentials.phone,
                            password: hashedPassword,
                            auth_type: "credentials",
                        }
                    });
                    return {
                        id: user.id,
                        name: user.name,
                        phone: user.number,
                        email: user.number
                    }
                } catch (e) {
                    console.error("Unknown Error: ", e);
                }
                return null;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET || "secret",
    pages:{
        signIn: "/auth/signin",
        signUp: "/auth/signup",
    },
    callbacks: {
        async signIn({ user, account, profile }: any) {
            const existingUser = await db.user.findFirst({
                where: {
                    email: user.email,
                }
            });
            if (!existingUser) {
                try {
                    const newUserData: any = {
                        name: user.name || profile.name,
                        email: user.email || profile.email,
                        auth_type: account.provider === "google" ? AuthType.Google : AuthType.credentials,  // Use enum
                    };

                    // Add phone number and password if they exist
                    if (user.number || profile.number) {
                        newUserData.number = user.number || profile.number || "O-Auth";
                    } else {
                        newUserData.number = "O-Auth"; // Default value for OAuth users
                    }

                    if (user.password || profile.password) {
                        newUserData.password = user.password || profile.password || "O-Auth";
                    } else {
                        newUserData.password = "O-Auth"; // Default value for OAuth users
                    }

                    await db.user.create({

                        data: newUserData,
                    });
                } catch (e) {
                    console.error("Error creating user in database:", e);
                    return false; // Return false to cancel the sign-in process
                }
            }
            return true; // Allow sign-in
        },
        async session({ token, session }: any) {
            session.user.id = token.user
            return session
        },

        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            // Redirect to /dashboard after a successful login
            return baseUrl + '/home';
        }
    },
}

