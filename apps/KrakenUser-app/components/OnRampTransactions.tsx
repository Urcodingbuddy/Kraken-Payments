import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between border-b py-2">
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                    <div className={`text-xs flex justify-end items-center ${t.status === "Failure"
                            ? "text-red-500"
                            : t.status === "Success"
                                ? "text-green-500"
                                : t.status === "Processing"
                                    ? "text-yellow-500"
                                    : "text-gray-500"
                        }`}>

                        {t.status === "Processing" && (
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#999999"><path d="M480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 27-3.5 53T850-376q-14-13-31-21t-36-10q5-18 7-36t2-37q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91q52 0 98.5-15.5T664-228q9 17 23 29t31 20q-49 39-109.5 61T480-96Zm288-144q-20 0-34-14t-14-34q0-20 14-34t34-14q20 0 34 14t14 34q0 20-14 34t-34 14Zm-154-70L444-480v-240h72v210l149 149-51 51Z"/></svg>
                        )}
                        {t.status}
                    </div>
                </div>
            </div>)}
        </div>
    </Card>
}