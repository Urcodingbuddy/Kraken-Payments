"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { p2pTransfer } from "../app/lib/actions/p2ptransfer";
export const SendMoneyCard = () => {
    const [amount, setAmount] = useState('');
    const [number, setNumber] = useState('');
    return <Card title="Send Money">
        <div className="w-96">
            <TextInput label={"Number"} placeholder={"Phone number"} type="number" onChange={(value) => {
                setNumber(value)
            }} 
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
                const inputValue = e.currentTarget.value.replace(/[^0-9]/g, ''); // Only allows numbers
                e.currentTarget.value = inputValue; // Replace non-numeric characters
              }} />
            <TextInput label={"Amount"} placeholder={"Amount"} type="text" onChange={(value) => {
                setAmount(value);
            } } onInput={undefined} />
            <div className="flex justify-center pt-4">
                <Button onClick={async () => {
                    await p2pTransfer(number, Number(amount)*100)
                }}>
                    Add Money
                </Button>
            </div>
        </div>
    </Card>
}