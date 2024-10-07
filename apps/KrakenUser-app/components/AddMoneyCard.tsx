"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createWalletTxn } from "../app/lib/actions/createwalletTxn";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl || "");
    const [amount, setAmount] = useState<number>(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "")

    const handleAmountChange = (value: string) => {
        // Regex: disallows symbols, letters, prevents leading zeros (except "0" alone)
        const regex = /^[1-9][0-9]*$|^0$/;
    
        if (value === "" || regex.test(value)) {
          // Only set if valid input
          setAmount(Number(value));
        }
      };
    return <Card title="Add Money">
        <div className="w-full">
            <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
                handleAmountChange(value); // handle validation
            } }
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
                const inputValue = e.currentTarget.value.replace(/[^0-9]/g, ''); // Only allows numbers
                e.currentTarget.value = inputValue; // Replace non-numeric characters
            } } type={"number"}        />
            <div className="py-4 text-left">
                Bank
            </div>
            <Select onSelect={(value) => {
                setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
                setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
            }} options={SUPPORTED_BANKS.map(x => ({
                key: x.name,
                value: x.name
            }))} />
            <div className="flex justify-center pt-4">
                <Button onClick={async () => {
                    console.log('Attempting to create on-ramp transaction');
                    console.log(`The Amount: ${amount} with Provider: ${provider}`)
                    await createWalletTxn(amount*100, provider)
                    // window.location.href = redirectUrl || "";
                }}>
                    Add Money
                </Button>
            </div>
        </div>
    </Card>
}