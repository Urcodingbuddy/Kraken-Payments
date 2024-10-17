"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createWalletTxn } from "../app/lib/actions/createwalletTxn";
import { Loader } from "@repo/ui/loader";

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
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

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
            }}
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    const inputValue = e.currentTarget.value.replace(/[^0-9]/g, ''); // Only allows numbers
                    e.currentTarget.value = inputValue; // Replace non-numeric characters
                }} type={"number"} />
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
                    setLoading(true)
                    const res = await createWalletTxn(amount * 100, provider)
                    if (res?.message) {
                        setLoading(false)
                        setError(res.message)
                    }
                    window.location.href = redirectUrl || "";
                }}>
                     <span className='inline-flex gap-5 '>Add Money   {loading && <Loader />}</span>
                </Button>
            </div>
                <div className='w-full mt-2 flex justify-center'>
                    {error && <p className='h-4 text-wrap' style={{ color: 'red' }}>{error}</p>}
                </div>
        </div>
    </Card>
}