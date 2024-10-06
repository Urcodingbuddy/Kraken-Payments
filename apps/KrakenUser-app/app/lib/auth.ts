import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import db from "@repo/db/client"
import bcrypt from "bcrypt"


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
                name: { label: "Name", type: "text", placeholder: "name" }, // Only required for sign-up
                email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
                phone: { label: "Phone", type: "text", placeholder: "your phone number" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const action = req.body?.action;  // Custom action type to distinguish sign-in/sign-up
                // If action is sign-in, only require email/phone and password
                if (action === 'signIn') {
                    if (!credentials?.email && !credentials?.phone || !credentials?.password) {
                        throw new Error("Email/Phone and password are required for sign-in");
                    }
                    // Lookup user in the database by email/phone
                    const existingUser = await db.user.findFirst({
                        where: {
                            OR: [{ email: credentials?.email }, { number: credentials?.phone }],
                        },
                    });

                    if (!existingUser) {
                        throw new Error("No user found with the provided credentials");
                    }

                    // Validate password
                    const passwordValid = await bcrypt.compare(credentials.password, existingUser.password);
                    if (!passwordValid) {
                        throw new Error("Invalid password");
                    }
                    return { id: existingUser.id, email: existingUser.email, phone: existingUser.number };
                }

                // If action is sign-up, require name, email, phone, and password
                if (action === 'signUp') {
                    if (!credentials?.name || !credentials?.email || !credentials?.phone || !credentials?.password) {
                        throw new Error("All fields are required for sign-up");
                    }

                    const hashedPassword = await bcrypt.hash(credentials?.password, 10);
                    const newUser = await db.user.create({
                        data: {
                            name: credentials?.name,
                            email: credentials?.email,
                            number: credentials?.phone,
                            password: hashedPassword,
                            auth_type: "credentials",
                        },
                    });
                    return { id: newUser.id, email: newUser.email, phone: newUser.number };
                }
                throw new Error("Invalid action");
            },
        })

    ],
    secret: process.env.NEXTAUTH_SECRET || "secret",
    pages: {
        signIn: "/auth/signin",
        signUp: "/auth/signup",
    },
    callbacks: {

        async session({ token, session }: any) {
            session.user.id = token.id
            return session
        },

        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            // Redirect to /dashboard after a successful login
            return baseUrl + '/home';
        }
    },
}

