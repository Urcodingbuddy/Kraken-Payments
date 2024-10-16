"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { p2pTransfer } from "../app/lib/actions/p2ptransfer";
import { Loader } from "@repo/ui/loader";
export const SendMoneyCard = () => {
    const [amount, setAmount] = useState('');
    const [number, setNumber] = useState('');
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    return <Card title="Send Money">
        <div className="w-full">
            <TextInput label={"Number"} placeholder={"Phone number"} type="number" onChange={(value) => {
                setNumber(value)
            }}
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    const inputValue = e.currentTarget.value.replace(/[^0-9]/g, ''); // Only allows numbers
                    e.currentTarget.value = inputValue; // Replace non-numeric characters
                }} />
            <TextInput label={"Amount"} placeholder={"Amount"} type="number" onChange={(value) => {
                setAmount(value);
            }} onInput={(e: React.FormEvent<HTMLInputElement>) => {
                const inputValue = e.currentTarget.value.replace(/[^0-9]/g, ''); // Only allows numbers
                e.currentTarget.value = inputValue; // Replace non-numeric characters
            }} />
            <div className="flex justify-center pt-4">
                <Button onClick={async () => {
                    setLoading(true)
                    const res = await p2pTransfer(number, Number(amount) * 100)
                    if (res?.message) {
                    setLoading(false)
                    setError(res.message)
                    }
                }}>
                    <span className='inline-flex gap-5 '>Send Money  {loading && <Loader />}</span>
                </Button>
            </div>
            <div className='w-full mt-2 flex justify-center'>
                {error && <p className='h-4 text-wrap' style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    </Card>
}