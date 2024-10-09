
import { SendMoneyCard } from "../../../components/SendMoneyCard";


export default function () {
    return <div className="h-[calc(100vh-4rem)] overflow-y-scroll w-full bg-black flex-col  dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <h1 className="text-[#A704BF] font-extrabold text-4xl ml-20 mt-16 z-10 mb-8">P2P Transfer</h1>
        <div className="flex justify-center items-center p-4 z-10 overflow-y-scroll">
            <SendMoneyCard />
        </div>
    </div>


}