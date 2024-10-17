import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { WalletTxn } from "../../../components/WalletTxn";
import { getBalance } from "../../lib/actions/getBalance";
import { getWalletTxns } from "../../lib/actions/getWalletTxns";



export default async function() {
  const balance = await getBalance();
  const transactions = await getWalletTxns();
  return <div className="h-[calc(100vh-4rem)] w-full bg-black flex-col justify-center  dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex">
    {/* Radial gradient for the container to give a faded look */}
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    <h1 className="text-[#A704BF] font-extrabold text-4xl mb-2  md:mb-8  ml-20   md:ml-20 md:mt-16 mt-5 z-10">Wallet</h1>
        <div className="overflow-y-scroll h-full max-h grid grid-cols-1 md:grid-cols-2 justify-center gap-4 p-4 z-10">
            <div className="flex justify-end items-start">
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