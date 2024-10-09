

export default function () {
  return <div className="h-[calc(100vh-4rem)] w-full bg-black   dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex">
    {/* Radial gradient for the container to give a faded look */}
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

    <h1 className="text-[#A704BF] text-4xl font-extrabold  mt-5 ml-5  md:ml-20 md:mt-16 mb-8 z-10">Recent Transactions</h1>
         

  </div>
} 