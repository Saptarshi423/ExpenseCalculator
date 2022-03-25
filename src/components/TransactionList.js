import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Transaction } from "./Transaction";
export const TransactionList = () => {
  const { transactions, itemPresent } = useContext(GlobalContext);
  //console.log(data);
  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.length === 0 && <p>No items to display</p>}
        {transactions.map((tran) => {
          //   const { id, text, amount } = tran;
          return <Transaction key={tran.id} tran={tran} />;
        })}
      </ul>
    </>
  );
};
