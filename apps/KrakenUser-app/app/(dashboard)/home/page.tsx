import { GlobeDemo } from "../../../@/components/ui/gitglobe";
import { GlobeLoader } from "../../../components/GlobeLoader";
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth"


export default function () {
    const session = getServerSession(authOptions);
    return (
        <div className="h-[calc(100vh-4rem)] w-full bg-black   dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex flex-col">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <h1 className="text-[#A704BF] font-extrabold text-4xl ml-20 mt-16 z-10">Kraken Wallet Global</h1>
            <GlobeLoader />
        </div>
    )
} 