// 'use client'; // Marking this component as client-side to use hooks
// import { useState, useEffect } from "react";
// import { GlobeDemo } from "../.././KrakenUser-app/@/components/ui/gitglobe";
// import { BigLoader } from "@repo/ui/BigLoader";


// export function GlobeLoader() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading for the GlobeDemo component.
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1500); // Adjust the time as per the actual loading time of GlobeDemo

//     return () => clearTimeout(timer); // Clean up the timeout when component unmounts
//   }, []);

//   return (
//     <div className="globe-container">
//       {loading ? (
//         <div className="globe-skeleton-container flex justify-center items-center h-[600px] w-full">
//           {/* Improved, more visually appealing loader */}
//           <div className="flex gap-10 px-10 text-center flex-col items-center justify-center text-2xl md:text-5xl sm:text-4xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
//           <BigLoader/><span>Prepare for something spectacular.</span> 
//           </div>
//         </div>
//       ) : (
//         <div>
//           <GlobeDemo />
//         </div>
//       )}
//     </div>
//   );
// }


'use client'; // Marking this component as client-side to use hooks
import { useState, useEffect } from "react";
import { GlobeDemo } from "../.././KrakenUser-app/@/components/ui/gitglobe";
import { BigLoader } from "@repo/ui/BigLoader";

export function GlobeLoader() {
  const [loading, setLoading] = useState(true);
  const [showGlobe, setShowGlobe] = useState(false);

  useEffect(() => {
    // Timer to manage loader and transition
    const timer = setTimeout(() => {
      setLoading(false);  // Start fading out the loader after 3 seconds
      setTimeout(() => {
        setShowGlobe(true); // Show the globe after the loader fades out
      }, 100); // Delay to give time for the loader fade out before globe appears
    }, 1500); // 3 seconds for loader opacity = 1

    return () => clearTimeout(timer); // Clean up the timeout when component unmounts
  }, []);

  return (
    <div className="globe-container relative">
      {loading && (
        <div
          className={`globe-skeleton-container flex justify-center items-center h-[600px] w-full transition-opacity duration-500`}
          style={{ opacity: loading ? 1 : 0 }}
        >
          {/* Improved, more visually appealing loader */}
          <div className="flex gap-10 px-10 text-center flex-col items-center justify-center text-2xl md:text-5xl sm:text-4xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            <BigLoader />
            <span>Prepare for something spectacular.</span>
          </div>
        </div>
      )}

      <div
        className="globe-demo-container transition-opacity"
        style={{ opacity: showGlobe ? 1 : 0 }}
      >
        {showGlobe && <GlobeDemo />}
      </div>
    </div>
  );
}

