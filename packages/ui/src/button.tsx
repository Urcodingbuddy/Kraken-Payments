"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} type="button" className="text-black rounded-none bg-[#ffffff] hover:bg-[#A704BF] hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 me-2 mb-2">
      {children}
    </button>
  );
};
