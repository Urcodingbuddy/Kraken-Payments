
"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRamptnx(amount: number, provider: string) {
    const session = await getServerSession(authOptions);
    const token = Math.random().toString();
    const userId = session?.user?.id;
    if (!userId) {
        console.log("Please log in & try again")
        return {
            massage: "User not logged in"
        }
    }
    try {
        await prisma.onRampTransaction.create({
            data: {
                userId: Number(userId),
                amount: amount,
                status: "Processing",
                startTime: new Date(),
                provider:provider || "Fampay",
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