import { Card } from "@repo/ui/card"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";


export const P2PTxn = ({
    p2pTxns,
    session,
  }: {
    p2pTxns: any;
    session: any;
  }) => {
    if (!P2PTxn.length) {
        return <Card title="Wallet Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="P2P Transfers">
            <div className="pt-2">
            {p2pTxns.map((t: { fromUserId: any; toUser: { name: string; }; fromUser: { name: string; }; timestamp: { toDateString: () => string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; amount: number; status: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; }) => <div className="flex justify-between border-b py-2">
                <div>

                    <div className="text-sm">
                    {t.fromUserId == session.user.id
                        ? t.toUser?.name.charAt(0).toUpperCase() + t.toUser?.name.slice(1).toLowerCase()
                        : t.fromUser?.name.charAt(0).toUpperCase() + t.fromUser?.name.slice(1).toLowerCase()
                        }

                    </div>
                    <div className="text-slate-500 text-xs">
                    {t.timestamp.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                <div className={`${
                        t.fromUserId == session.user.id
                        ? `text-red-700` : `text-green-600`
                        }`}>
                        {t.fromUserId == session.user.id
                        ? `- Rs ${t.amount/100}`
                        : `+ Rs ${t.amount/100}`
                        }
                    </div>
                    <div className={`text-xs flex justify-end items-center ${t.status === "Failed"
                            ? "text-red-500"
                            : t.status === "Successful"
                                ? "text-green-500"
                                : t.status === "Pending"
                                    ? "text-yellow-500"
                                    : "text-gray-500"
                        }`}>
                        {t.status === "Pending" && (
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#999999"><path d="M480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 27-3.5 53T850-376q-14-13-31-21t-36-10q5-18 7-36t2-37q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91q52 0 98.5-15.5T664-228q9 17 23 29t31 20q-49 39-109.5 61T480-96Zm288-144q-20 0-34-14t-14-34q0-20 14-34t34-14q20 0 34 14t14 34q0 20-14 34t-34 14Zm-154-70L444-480v-240h72v210l149 149-51 51Z"/></svg>
                        )}
                        {t.status}
                    </div>
                </div>
            </div>)}
        </div>
    </Card>
}