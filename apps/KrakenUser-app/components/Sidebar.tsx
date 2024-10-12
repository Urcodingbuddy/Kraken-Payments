"use client"
import { useState } from "react";
import { SidebarItem } from "./SidebarItem";

export default function () {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const toggleMenu = () => {
        setIsCollapsed(!isCollapsed); // Toggle the collapse state
      };

    return (
        
        <div className={`h-[calc(100vh-4rem)]  transition-width duration-300 ease-in-out  ${
            isCollapsed ? "w-[0px] lg:w-[72px] lg:bg-dot-white/[0.15]" : "w-[72px] md:w-56  bg-dot-white/[0.15]"
          }`}
          >
            <button className={`p-5 cursor-pointer`} onClick={toggleMenu}>
                <Menu/>
            </button>
            <div className="gap-16 flex flex-col h-100 justify-center mt-20">
            <SidebarItem href={"/home"}
                icon={(selected) => selected ? <SelectedHomeIcon /> : <HomeIcon />}
                title="Home"
                isCollapsed={isCollapsed}
                />
            <SidebarItem href={"/wallet"}
                icon={(selected) => selected ? <SelectedTransferIcon /> : <TransferIcon />}
                title="Wallet"
                isCollapsed={isCollapsed} />
            <SidebarItem href={"/transactions"}
                icon={(selected) => selected ? <SelectedTransactionsIcon /> : <TransactionsIcon />} title="Transactions"
                isCollapsed={isCollapsed} />
            <SidebarItem href={"/p2pTransfer"}
                icon={(selected) => selected ? <SelectedP2PIcon /> : <P2PIcon />}
                title="P2P Transfer"
                isCollapsed={isCollapsed}/>
                </div>
        </div>
    )
}

function Menu(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8"  viewBox="0 -960 960 960"  fill="#A704BF"><path d="M145.48-219.09q-16.71 0-28.16-11.5t-11.45-28.85q0-16.78 11.45-28.1 11.45-11.33 28.16-11.33h669.04q16.71 0 28.44 11.5 11.74 11.5 11.74 28.29 0 17.34-11.74 28.67-11.73 11.32-28.44 11.32H145.48Zm0-221.3q-16.71 0-28.16-11.5t-11.45-28.29q0-16.78 11.45-28.1 11.45-11.33 28.16-11.33h669.04q16.71 0 28.44 11.5 11.74 11.5 11.74 28.29 0 16.78-11.74 28.1-11.73 11.33-28.44 11.33H145.48Zm0-220.74q-16.71 0-28.16-11.5t-11.45-28.85q0-16.78 11.45-28.11 11.45-11.32 28.16-11.32h669.04q16.71 0 28.44 11.5 11.74 11.5 11.74 28.28 0 17.35-11.74 28.67-11.73 11.33-28.44 11.33H145.48Z"/></svg>
    )
}

function HomeIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
    )
}
function SelectedHomeIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
        >
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
        </svg>
    );
}

function TransferIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
        </svg>
    )
}

function SelectedTransferIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
        </svg>
    )
}


function TransactionsIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    )
}

function SelectedTransactionsIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
        </svg>
    )
}

function P2PIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
    )
}

function SelectedP2PIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
        </svg>

    )
}