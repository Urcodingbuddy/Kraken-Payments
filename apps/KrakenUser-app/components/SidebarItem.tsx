"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon, isCollapsed }: { href: string; title: string; icon: (selected: boolean) => React.ReactNode; isCollapsed:boolean}) => {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href

    return <div className={`flex ${selected ? "text-[#A704BF]" : "text-slate-500"} cursor-pointer flex flex-col it h-12 justify-start   md:flex-row md:items-center  md:border-r-purple-700  px-5  pl-5`} onClick={() => {
        router.push(href);
    }}>
        <div className={`pr-2 md:block ${isCollapsed ? "hidden":"block"}`}>
            {icon(selected)}
        </div>
        <div
        className={`font-bold text-2xl hidden md:block transition-all duration-300 ease-in-out ${
          isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-1 w-auto"
        } ${selected ? "text-[#A704BF]" : "text-slate-500"}`}
      >
        <span>{title}</span>
      </div>
    </div>
}