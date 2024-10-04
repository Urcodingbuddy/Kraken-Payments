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
  const router = useRouter();
  const pathname = usePathname();

  const hideButton = pathname === "/signin" || pathname === "/signup";
  return (
   <div>
      <Appbar onSignin={signIn} onSignout={async () => {
        await signOut()
      }} user={session.data?.user}
      showButton={!hideButton} />
   </div>
  );
}
