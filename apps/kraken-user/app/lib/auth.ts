import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import db from "@repo/db/client";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", required: true },
                number: { label: "Phone", type: "text", required: true },
                password: { label: "Password", type: "password", required: true },
            },
            async authorize(credentials){
                if (!credentials) {
                    return null;  // Return null if no credentials are provided
                }
                const { email, number, password } = credentials;
                const user = await db.user.findFirst({
                    where: { email, number }
                });
                if(user && bcrypt.compareSync(password, user.password)){
                    return {id:user.id, name:user.name , email:user.email};
                }
                else{
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || ""
        })
    ],
    pages:{
        signIn: '/auth/signin',
        signUp: '/auth/signup',
    },
    callbacks:{
        async session({session, token}:any){
            session.user.id = token.sub;
            return session
        },
        async jwt({token, user}:any){
            if(user){
                token.sub = user.id;
                token.phone = user.phone;
                token.email = user.email;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}