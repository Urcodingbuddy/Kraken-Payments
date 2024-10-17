"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { usePathname } from "next/navigation";


export function AppbarClient() {
  const session = useSession();
  const pathname = usePathname();

  const ShowButton = pathname === "/";
  return (
   <div>
      <Appbar onSignin={signIn} onSignout={async () => {
        await signOut()
        window.location.href = "/api/auth/signin";
      }} user={session.data?.user}
      showButton={ShowButton} />
   </div>
  );
}
