import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map((transaction) => transaction.amount);
  const balance = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  //console.log(amounts);
  return (
    <>
      <h4>Your Balance</h4>
      <h1>Rs{balance}</h1>
    </>
  );
};

export default Balance;
