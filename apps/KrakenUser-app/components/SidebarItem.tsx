"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon }: { href: string; title: string; icon: (selected: boolean) => React.ReactNode; }) => {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href

    return <div className={`flex ${selected ? "text-[#A704BF]" : "text-slate-500"} cursor-pointer flex items-center  p-2 pl-8`} onClick={() => {
        router.push(href);
    }}>
        <div className="pr-2">
            {icon(selected)}
        </div>
        <div className={`font-bold text-2xl ${selected ? "text-[#A704BF]" : "text-slate-500"}`}>
            {title}
        </div>
    </div>
}