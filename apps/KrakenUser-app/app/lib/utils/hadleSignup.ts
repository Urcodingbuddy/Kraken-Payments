import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Custom hook for sign-up logic
export const useSignUp = () => {
  const router = useRouter();

  const handleSignUp = async (
    email: string, 
    name: string, 
    phone: string, 
    password: string, 
    confirmPassword: string, 
    setError: (error: string) => void, 
    setLoading: (loading: boolean) => void, 
    callbackUrl: string = "/home"
  ) => {
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      name,
      phone,
      password,
      confirmPassword,
      redirect: false,
      action: "signUp",
      callbackUrl,
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

  return { handleSignUp };
};
