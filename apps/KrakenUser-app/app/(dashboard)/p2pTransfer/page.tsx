
import { SendMoneyCard } from "../../../components/SendMoneyCard";


export default function () {
    return (
        <div className="h-[calc(100vh-4rem)] w-full bg-black   dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex flex-col">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <h1 className="text-[#A704BF] text-4xl ml-20 mt-16 z-10 mb-8">P2P Via Phone number</h1>
            <div className="w-full h-full flex justify-center items-center">
            <div className="">
                <SendMoneyCard/>
            </div>
        </div>
        </div>
    )

}