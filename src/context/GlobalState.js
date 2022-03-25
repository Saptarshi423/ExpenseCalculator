import React, { useContext, useReducer } from "react";

const localStorageTransactions = () => {
  const data = JSON.parse(localStorage.getItem("transactions"));
  //console.log(data);
  return data;
};

const getTransactions = () => {
  let allTransactions =
    localStorage.getItem("transactions") !== null
      ? localStorageTransactions()
      : [];
  //console.log(allTransactions);
  return allTransactions;
};

// Update local storage transactions
function updateLocalStorage(transactions) {
  const data = getTransactions();
  const updatedTransactions = [...data, transactions];
  localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
}

const AppReducer = (state, action) => {
  switch (action.type) {
    case "DELETE_TRANSACTION":
      const data = JSON.parse(localStorage.getItem("transactions"));
      const updatedData = data.filter(
        (transaction) => transaction.id !== action.payload
      );
      //console.log(updatedData);
      localStorage.setItem("transactions", JSON.stringify(updatedData));
      return {
        ...state,
        transactions: updatedData,
      };

    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    default:
      return state;
  }
};

//Initial State
const initialState = {
  transactions: getTransactions(),
  itemPresent: false,
};

// Create Context
export const GlobalContext = React.createContext(initialState);

//Provider Context
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  function deleteTransaction(id) {
    console.log(id);
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }

  function addTransaction(transaction) {
    updateLocalStorage(transaction);
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        itemPresent: state.itemPresent,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
