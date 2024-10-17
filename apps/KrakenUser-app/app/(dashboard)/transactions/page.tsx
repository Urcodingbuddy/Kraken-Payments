import { getServerSession } from "next-auth";
import { P2PTxn } from "../../../components/P2PTxn";
import { WalletTxn } from "../../../components/WalletTxn";
import { authOptions } from "../../lib/auth";
import { getP2Ptxns } from "../../lib/actions/getP2Ptxns";
import { getWalletTxns } from "../../lib/actions/getWalletTxns";


export default async function () {
  const session = await getServerSession(authOptions);
  const transactions = await getWalletTxns();
  const p2pTxns = await getP2Ptxns();
  return <div className="h-[calc(100vh-4rem)] flex-col w-full bg-black   dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex">
    {/* Radial gradient for the container to give a faded look */}
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    <h1 className="text-[#A704BF] text-4xl font-extrabold  mt-5  ml-20   md:ml-20 md:mt-16 z-10 mb-8">Recent Transactions</h1>
    <div className="overflow-y-scroll h-full max-h grid grid-cols-1 md:grid-cols-2 justify-center gap-4 p-4 z-10">
      <div className="flex justify-center md:justify-end items-start">
        <WalletTxn transactions={transactions} />
      </div>
      <div className="text-red-700 flex justify-center items-start md:justify-start">
        < P2PTxn session={session} p2pTxns={p2pTxns} />
      </div>
    </div>
  </div>
} 