import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Transaction = ({ tran }) => {
  const { id, text, amount } = tran;
  const { deleteTransaction } = useContext(GlobalContext);
  const sign = amount < 0 ? "-" : "+";
  return (
    <li key={id} className={amount > 0 ? "plus" : "minus"}>
      {text}
      <span>
        {sign}Rs{Math.abs(amount)}
      </span>
      <button
        className="delete-btn"
        onClick={() => {
          deleteTransaction(id);
        }}
      >
        x
      </button>
    </li>
  );
};
