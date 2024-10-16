
import { useEffect, useRef, useState } from "react"; // Import useState
import { Button } from "./button";
import { Loader } from "./loader";
import { Avatar } from "./Avatar";
import { InfoDrop } from "./infoDrop";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  // Updated types for onSignin and onSignout
  onSignin: () => Promise<void> | void;
  onSignout: () => Promise<void> | void;
  showButton?: boolean;
}

export const Appbar = ({
  user,
  onSignin,
  onSignout,
  showButton = true,
}: AppbarProps) => {
  const [loading, setLoading] = useState(false); // State for loading
  const [showInfo, setShowInfo] = useState(false)
  const infoDropRef = useRef<HTMLDivElement>(null);




  const handleButtonClick = async () => {
    // Set loading to true on button click
    setLoading(true);

    try {
      // Call the appropriate handler based on whether the user is signed in or not
      if (user) {
        await onSignout();
      } else {
        await onSignin();
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      // Set loading to false once action completes (successful or failed)
      setLoading(false);
    }
  };

  const handleshowInfo = () => {
    setShowInfo((prev) => !prev); // Toggle InfoDrop visibility
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (infoDropRef.current && !infoDropRef.current.contains(event.target as Node)) {
        setShowInfo(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-16 justify-between items-center border-b pl-4 bg-black border-[#A704BF]">
      <div className="w-36">
        <img className="larger" src="/kraken-4.svg" alt="kraken logo vector" />
      </div>
      <div className="flex justify-center items-center h-full">
        <div className="pr-3">
          {showButton && (
            <Button onClick={handleButtonClick}>
              <span className="inline-flex gap-5">
                {user ? "Logout" : "Login"}
                {loading && <Loader />} {/* Display loader when loading is true */}
              </span>
            </Button>
          )}
        </div>
        {user ? <div onClick={handleshowInfo} ref={infoDropRef} className="h-full w-24 relative flex justify-center items-center border-l-[#A704BF] border-l hover:bg-[#A704BF]">
          <div>
            <Avatar />
            {showInfo && <InfoDrop />}
          </div>
        </div> : ""}
      </div>
    </div>
  );
};
