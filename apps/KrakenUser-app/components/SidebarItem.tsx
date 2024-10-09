"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon, isCollapsed }: { href: string; title: string; icon: (selected: boolean) => React.ReactNode; isCollapsed:boolean}) => {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href

    return <div className={`flex ${selected ? "text-[#A704BF]" : "text-slate-500"} cursor-pointer flex items-center h-12  p-2 pl-5`} onClick={() => {
        router.push(href);
    }}>
        <div className="pr-2">
            {icon(selected)}
        </div>
        <div
        className={`font-bold text-2xl transition-all duration-300 ease-in-out ${
          isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
        } ${selected ? "text-[#A704BF]" : "text-slate-500"}`}
      >
        <span>{title}</span>
      </div>
    </div>
}