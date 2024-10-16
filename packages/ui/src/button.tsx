"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  fullWidth?: boolean
}

export const Button = ({ onClick, children, type= "button", fullWidth }: ButtonProps) => {
  return (
    <button onClick={onClick} type={type} className={ `text-black rounded-none ${fullWidth ? 'w-full' : ''} bg-[#ffffff] hover:bg-[#A704BF] hover:text-white focus:outline-none focus:ring-none  font-medium text-sm px-5 py-2.5`}>
      {children}
    </button>
  );
};
