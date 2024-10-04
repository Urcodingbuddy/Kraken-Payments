import { BackgroundLines } from "../@/components/ui/background-lines";

export default function Home() {
  return (
    <div className='w-screen h-[calc(100vh-4rem)]'>
      <div className="w-full h-[calc(100vh-4rem)] bg-black dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex items-center justify-center">
        <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 bg-transparent z-10 ">
          <div>hy</div>
        </BackgroundLines>
      </div>
    </div>
  );
}


