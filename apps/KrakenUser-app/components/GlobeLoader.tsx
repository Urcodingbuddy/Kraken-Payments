'use client'; // Marking this component as client-side to use hooks
import { useState, useEffect } from "react";
import { GlobeDemo } from "../.././KrakenUser-app/@/components/ui/gitglobe";

export function GlobeLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for the GlobeDemo component.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // Adjust the time as per the actual loading time of GlobeDemo

    return () => clearTimeout(timer); // Clean up the timeout when component unmounts
  }, []);

  return (
    <div className="globe-container">
      {loading ? (
        <div className="globe-skeleton-container flex justify-center items-center h-[600px] w-full">
          {/* Improved, more visually appealing loader */}
          <img
            src="./clock.svg"
            alt="Kraken Loader"
            className="kraken-loader"
          />
        </div>
      ) : (
        <GlobeDemo />
      )}
    </div>
  );
}