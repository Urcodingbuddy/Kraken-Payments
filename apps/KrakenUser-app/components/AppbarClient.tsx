"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
interface AppbarClientProps {
  showButton?: boolean;
}

export function AppbarClient({ showButton = true }: AppbarClientProps) {
  const session = useSession();
  const pathname = usePathname();

  const hideButton = pathname === "/auth/signin" || pathname === "/auth/signup";
  return (
   <div>
      <Appbar onSignin={signIn} onSignout={async () => {
        await signOut()
        window.location.href = "/api/auth/signin";
      }} user={session.data?.user}
      showButton={!hideButton} />
   </div>
  );
}
