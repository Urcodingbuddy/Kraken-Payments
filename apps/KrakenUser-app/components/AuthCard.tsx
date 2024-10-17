

export function AuthCard({
    title,
    children,
}: {
    title: string;
    children?: React.ReactNode;
}): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center border-0 sm:border w-96 h-100 backdrop-blur-0 sm:backdrop-blur-sm text-white absolute">
            <h1 className="text-2xl font-bold pt-4">{title}</h1>
            <div className="flex space-x-4 py-2"></div>
            {children}
            </div>
        
    )
}