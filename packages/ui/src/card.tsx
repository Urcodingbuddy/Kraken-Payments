import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    
    <div className="w-full max-w-[600px] border-2 overflow-y-scroll  p-6 rounded-none backdrop-blur-[3px] text-white shadow-md hover:shadow-[0_0_10px_rgba(167,4,191,0.7)] transition-shadow duration-300">
      <h1 className="text-2xl text-[#A704BF] font-semibold mb-4 border-b-2 border-[#A704BF] pb-2">
        {title}
      </h1>
      {children}
    </div>
  );
}
