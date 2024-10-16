
import { useSession } from "next-auth/react";


export const Avatar = () =>{
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  
  
    return (
         <button className="bg-gray-300 text-black text-lg font-bold border-[#000000]  border-2 w-8 h-8 rounded-full">
          {session?.user?.name ? session?.user?.name?.charAt(0).toUpperCase():"!"} 
        </button>   
    )
}