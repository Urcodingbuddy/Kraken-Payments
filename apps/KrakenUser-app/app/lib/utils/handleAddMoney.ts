// handleAddMoney.ts
import { useRouter } from "next/router";
import { createWalletTxn } from "../actions/createwalletTxn";

export const handleAddMoney = async (amount: number, provider: any, setLoading: (loading: boolean) => void, setError: (error: string) => void) => {
    const router = useRouter(); // Initialize the router

    try {
        setLoading(true);
        const res = await createWalletTxn(amount * 100, provider);

        if (res?.message) {
            setError(res.message);
        } else {
            // Navigate to the desired URL if there's no error
            router.push("/success"); // Change this to your desired redirect URL
        }
    } catch (error) {
        console.error("Error in handleAddMoney:", error);
        setError("An unexpected error occurred. Please try again.");
    } finally {
        setLoading(false);
    }
};
