"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createWalletTxn(amount: number, provider: string) {
    const session = await getServerSession(authOptions); 
    const token = Math.random().toString();
    const userId = session?.user?.id;
    if (!userId) {
        console.log("Please log in & try again")
        return {
            massage: "User not logged in"
        }
    }

    if (!amount) {
        return {
            message: "Amount cannot be empty"
        }
    }

    

    try {
        await prisma.walletTxn.create({
            data: {
                userId: userId,
                amount: amount,
                status: "Pending",
                startTime: new Date(),
                provider:provider,
                token:token
            } 
        })
        return {
            massage: "compleated transaction"
        }
    } catch (error) {
        console.error("Failed due to: ",error)
        return {
            massage: "Unable to compleat transaction"
        }
    }
}