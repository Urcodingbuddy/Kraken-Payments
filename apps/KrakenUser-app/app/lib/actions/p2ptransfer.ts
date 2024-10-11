"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    if (!amount && !to) {
        return {
            message: "Fill Amount and receiver's Phone Number"
        }
    }

    if (!amount) {
        return {
            message: "Amount cannot be empty"
        }
    }

    if (!to) {
        return {
            message: "Phone number cannot be empty"
        }
    }

    // Check if the phone number has less than 10 digits
    if (to.length < 10) {
        return {
            message: "Receiver's Phone Number must be 10 digits"
        }
    }
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Error while sending, Sign-In again !"
        }
    }
    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        }
    }

    if(Number(from) === Number(toUser.id)){
        return{ message:`Can't pay to self`};
    }
    await prisma.$transaction(async (tx: { $queryRaw: any; balance: { findUnique: (arg0: { where: { userId: any; }; }) => any; update: (arg0: { where: { userId: any; } | { userId: any; }; data: { amount: { decrement: number; }; } | { amount: { increment: number; }; }; }) => any; }; p2pTransfer: { create: (arg0: { data: { fromUserId: any; toUserId: any; amount: number; timestamp: Date; }; }) => any; }; }) => {

        await tx.$queryRaw`SELECT * FROM  "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`
        const fromBalance = await tx.balance.findUnique({
            where: { userId: from },
          });

          if (!fromBalance || fromBalance.amount < amount) {
            return {message: 'Insufficient funds'}
          }

          await tx.balance.update({
            where: { userId: from },
            data: { amount: { decrement: amount } },
          });

          await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
          });

          await tx.p2pTransfer.create({
            data:{
                fromUserId: from,
                toUserId:toUser.id,
                amount,
                timestamp: new Date()
            }
          })
    });
}