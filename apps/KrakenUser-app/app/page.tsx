
import { BackgroundLines } from "../@/components/ui/background-lines";

export default function Home() {
  return (
    <div className='w-screen h-[calc(100vh-4rem)]'>
      <div className="w-full h-[calc(100vh-4rem)] bg-black dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 bg-transparent z-10 ">
          <p className="text-center text-3xl lg:text-7xl md:text-4xl sm:text-4xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            Welcome to <span className="inline-flex text-nowrap place-items-baseline  text-[#A704BF]"><img className=" w-[2rem] lg:w-[3.5rem] md:w-[2.5rem] sm:w-[1.5rem] inline" src="./kraken-2.svg" alt="" />KRAKEN</span> wallet
          </p>

        </BackgroundLines>
      </div>
    </div>
  );
}


