
import React from "react";
import Sidebar from "../../components/Sidebar";


export default function Layout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <div className="flex">
            <div className="w-72 border-r  min-h-screen border-r-[#8905ff]">
                <Sidebar/>
            </div>
            {children}
        </div>
    )
}