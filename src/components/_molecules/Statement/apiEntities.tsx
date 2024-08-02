import { createContext, ReactNode } from "react";
import { useState } from "react";
import { useUserData } from "../../../hook/useHooks";

export type TransactionsFilter = {
    term: string;
    month: string;
    year: string;
}
export type Transaction = {
    description: string;
    id: string;
    type: string;
    card: string;
    date: string;
    amount: number;
}

interface Account {
    transactions: Transaction[];
    money: number;
    expenses: number;
    earnings: number;
}

export interface UserData {
    userid: string;
    password: string;
    fullname: string;
    birthdate: string;
    accounting: Account;
}

export const StatementContext = createContext<any>(undefined)

export const StatementContextProvider = ({children}: {children: ReactNode}) => {
    const [filter, setFilter] = useState<TransactionsFilter>();
    const userAccounting = useUserData()?.accounting

    return (
    <StatementContext.Provider value={{filter, setFilter, userAccounting}}>
        {children}
    </StatementContext.Provider>)
}