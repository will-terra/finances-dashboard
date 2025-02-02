import arrowDownIcon from "../../../assets/arrow_down.svg"
import arrowUpIcon from "../../../assets/arrow_up.svg"

import ButtonComponent from "../../_atoms/Button/Button"

import { TableRow } from "../../_atoms/TableRow/TableRow"
import { TableHeader } from "../../_atoms/TableHeader/TableHeader"
import { TableData } from "../../_atoms/TableData/TableData"

import { useScreenSize } from "../../../hook/useHooks"
import { useContext } from "react"
import { StatementContext, Transaction } from "./apiEntities"

export function StatementTable() {
    const statementContext = useContext(StatementContext)
    const screenSize = useScreenSize()

    const viewPort = {
        isMobile: screenSize.width < 710,
        isTablet: screenSize.width >= 710,
        isLaptop: screenSize.width > 890,
    }

    return (
        <table className="bg-bgwhite border-separate gap-3 px-6 py-3 rounded-2xl text-center dark:bg-dkrbgitenseblue">
            <thead>
                <TableRow>
                    <TableHeader content="Description" />
                    {viewPort.isTablet && 
                        <>
                            <TableHeader content="Transaction ID" />
                            <TableHeader content="Type" />
                            <TableHeader content="Card" />
                            <TableHeader content="Date" />
                        </>
                    }
                    <TableHeader content="Amount" />
                    {viewPort.isLaptop && <TableHeader content="Receipt" />}
                </TableRow>
            </thead>

            <tbody
                role="table-body"
                className="block overflow-y-scroll"
                style={{ maxHeight: `${window.innerHeight - 390}px`}}
            >
                {statementContext.filteredData?.map(
                    (transaction: Transaction) => {
                        const isDebit = (transaction.amount < 0)
                        return (
                            <TableRow key={transaction.id}>
                                <TableData>
                                    <span className="flex gap-2 items-center">
                                        <img
                                            src={isDebit ? arrowDownIcon : arrowUpIcon}
                                            alt="arrow"
                                        />
                                        {transaction.description}
                                    </span>
                                </TableData>

                                {viewPort.isTablet &&
                                    <>
                                        <TableData>{transaction.id}</TableData>
                                        <TableData>{transaction.type}</TableData>
                                        <TableData>
                                            {transaction.card.substring(0, 4).concat(" ****")}
                                        </TableData>
                                        <TableData>{transaction.date}</TableData>
                                    </>
                                }

                                <TableData variantStyle={isDebit ? "text-txtred" : "text-txtgreen"}>
                                    {isDebit
                                        ? `-$${transaction.amount.toString().substring(1)}`
                                        : `+$${transaction.amount}`}
                                </TableData>

                                {viewPort.isLaptop && (
                                    <TableData>
                                        <ButtonComponent
                                            arialabeltext="Download"
                                            bgcolor="bg-bgwhite"
                                            styles="border dark:bg-dkrbgitenseblue"
                                        >
                                            Download
                                        </ButtonComponent>
                                    </TableData>
                                )}
                            </TableRow>
                        )
                    }
                )}
            </tbody>
        </table>
    )
}
