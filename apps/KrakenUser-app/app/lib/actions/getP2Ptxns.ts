import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";


export async function getP2Ptxns() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.user.findUnique({
    where: {
      id: session?.user?.id
    },
    include: {
      sentTransfers: {
        include: {
          toUser: {
            select: {
              number: true,
              name: true
            },
          },
        },
      },
      receivedTransfers: {
        include: {
          fromUser: {
            select: {
              number: true,
              name: true
            },
          },
        },
      },
    },
  });

  const combinedTransactions = [
    ...(txns?.sentTransfers || []),
    ...(txns?.receivedTransfers || []),
  ];

  combinedTransactions.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return combinedTransactions;
}