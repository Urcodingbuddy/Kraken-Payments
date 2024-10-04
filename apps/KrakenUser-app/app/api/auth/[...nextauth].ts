import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@repo/db/client"
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
                email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
                phone: { label: "Phone", type: "text", placeholder: "your phone number" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if(!credentials){
                    throw new Error("Missing credentials");
                }
                const { email, phone, password } = credentials;
                let user;
        
                if (email) {
                  user = await prisma.user.findUnique({ where: { email } })
                } else if (phone) {
                  user = await prisma.user.findUnique({ where: { number: phone } })
                }
        
                if (!user) {
                  throw new Error("No user found with this email/phone")
                }
        
                const isValidPassword = await bcrypt.compare(password, user.password)
        
                if (!isValidPassword) {
                  throw new Error("Invalid credentials")
                }
        
                return user;
              },
        }),
    ],
    pages:{
        signIn: "/auth/signin",
        signUp: "/auth/signup",
    },
    callbacks:{
        async jwt({token, user, account}:{token: any, user?:any, account?:any}){
            if(account?.provider === "google" || account?.provider === "github"){
                const userInDb = await prisma.user.upsert({
                    where: {email: user.email || ''},
                    update: {name: user.name},
                    create:{
                        email: user.email,
                        name: user.name,
                        number: user.phoneNumber || null,
                        password: "",
                        auth_type: account.provider,
                    },
                })
                token.user = userInDb
            }
            return token
        },
        async session({session, token}:any){
            session.user = token.user
            return session
        },
    },
}

export default NextAuth(authOptions)