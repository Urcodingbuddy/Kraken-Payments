
import { BackgroundLines } from "../@/components/ui/background-lines";

export default function Home() {
  return (
    <div className='w-screen h-[calc(100vh-4rem)]'>
      <div className="w-full h-[calc(100vh-4rem)] bg-black dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 bg-transparent z-10 ">
          <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            Welcome to <span className="inline-flex items-center text-[#A704BF]"><img className="w-[4.5rem] inline" src="./kraken-2.svg" alt="" />KRAKEN</span> wallet
          </p>

        </BackgroundLines>
      </div>
    </div>
  );
}


