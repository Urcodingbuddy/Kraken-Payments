
import React from "react";
import Sidebar from "../../components/Sidebar";


export default function Layout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <div className="flex">
            <div className="w-72 border-r  min-h-full border-r-[#A704BF]">
                <Sidebar/>
            </div>
            {children}
        </div>
    )
}