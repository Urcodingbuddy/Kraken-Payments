import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";


export async function getWalletTxns() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.walletTxn.findMany({
    where: {
        userId: session?.user?.id,
    },
    orderBy: {
        startTime: 'desc',
    },
  });
  return txns.map((t: { startTime: any; amount: any; status: any; provider: any; }) => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider
  }))
}
