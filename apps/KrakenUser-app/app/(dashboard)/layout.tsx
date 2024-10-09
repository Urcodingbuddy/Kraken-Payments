
import React from "react";
import Sidebar from "../../components/Sidebar";


export default function Layout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <div className="flex relative">
            <div className="border-r  min-h-full border-r-[#A704BF] z-10">
                <Sidebar/>
            </div>
            
            <div className="flex justify-center w-full">
            {children}
            </div>
        </div>
    )
}

