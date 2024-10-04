import Link from "next/link";


export function AuthCard({
    title,
    children,
}: {
    title: string;
    children?: React.ReactNode;
}): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center border w-96 h-100 backdrop-blur-sm text-white absolute">
            <h1 className="text-2xl font-bold py-4">{title}</h1>
            <div className="flex space-x-4 py-2"></div>
            {children}
            </div>
        
    )
}