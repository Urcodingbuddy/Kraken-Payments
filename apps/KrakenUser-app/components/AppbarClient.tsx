"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
interface AppbarClientProps {
  showButton?: boolean;
}

export function AppbarClient({ showButton = false }: AppbarClientProps) {
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
