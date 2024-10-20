import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";


// Custom hook for sign-in logic
export const useSignIn = () => {
  const router = useRouter();
  
  const handleSignIn = async (
    email: string, 
    password: string, 
    setError: (error: string) => void, 
    setLoading: (loading: boolean) => void,
    callbackUrl: string = "/home"
  ) => {
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      action: "signIn",
      callbackUrl: callbackUrl,
    });
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else if (result?.url) {
      router.push(result.url);
    } else {
      console.error("Unexpected result:", result);
    }
  };

  return { handleSignIn };
};