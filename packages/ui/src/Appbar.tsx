import { Button } from "./button";
interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any,
    showButton?: boolean
}
export const Appbar = ({
    user,
    onSignin,
    onSignout,
    showButton = true
}: AppbarProps) => {
    return <div className="flex h-16 justify-between items-center border-b px-4 bg-black border-[#A704BF]">
<div className="w-36">
  <img className="larger" src="/kraken-4.svg" alt="kraken logo vector" />
</div>
        <div className="flex flex-col justify-center pt-2">
        {showButton && (
          <Button onClick={user ? onSignout : onSignin}>
            {user ? "Logout" : "Login"}
          </Button>
          )}
        </div>
    </div>
}