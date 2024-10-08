import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { WalletTxn } from "../../../components/WalletTxn";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
      where: {
          userId:session?.user?.id
      }
  });
  return {
      amount: balance?.amount || 0,
      locked: balance?.locked || 0
  }
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.walletTxn.findMany({
      where: {
          userId: session?.user?.id
      }
  });
  return txns.map(t => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider
  }))
}

export default async function() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();
  return <div className="h-[calc(100vh-4rem)] overflow-y-scroll w-full bg-black flex-col  dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex">
    {/* Radial gradient for the container to give a faded look */}
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    <h1 className="text-[#A704BF] font-extrabold text-4xl mt-5 ml-5  md:ml-20 md:mt-16 z-10 mb-8">Wallet</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-4 p-4 z-10 overflow-y-scroll">
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <WalletTxn transactions={transactions} />
                </div>
            </div>
        </div>
  </div>
} 