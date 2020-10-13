import React, {createContext, useReducer} from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// intitial state
// any global stat goes in this object
const initialState = {
  transactions: [],
  // since dealing with async calls to backend.. need to add these
  error: null,
  loading: true,
};

// Create context
export const GlobalContext = createContext(initialState);

// in order for components to have access to our store or global state, need to have a provider

// so wrap all components in a provider component

// Provider component
export const GlobalProvider = ({children}) => {
  // use useReducer, because need access to state and dispatch
  // useReducer(wherever reducer is, and initial state)
  // way to change state and send to components
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions

  // Need new action to fetch from the back end
  // GET.. using axios, so it is asynchronous, returns promise
  async function getTransactions() {
    try {
      // make request, put it in response variable
      const res = await axios.get("/api/v1/transactions");
      // now get the data.. res.data will give us the object, including success count and data..
      // so need another .data
      // so dispatch to reducer, cuz we're changing the state, starts as empty array.. make request, sned response down to state
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  // make calls to the reducer, when hooked to DB, make it async
  async function deleteTransaction(id) {
    try {
      // dont need to save response, just make a call
      await axios.delete(`/api/v1/transactions/${id}`);

      // dispatch to Reducer
      dispatch({
        type: "DELETE_TRANSACTION",
        //payload: any data we want to send to it
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function addTransaction(transaction) {
    // since we are actually sending data
    // axios uses config
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // where we are adding to, what we are adding, then config with Header
      const res = await axios.post("/api/v1/transactions", transaction, config);

      // dispatch to Reducer
      dispatch({
        type: "ADD_TRANSACTION",
        // payload: any data we want to send to it
        // we want to pass in data from the response
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  // need actual provider component
  // children prop inside, which is basically everything we wrap
  // provides any state or actions to the components that its wrapped around
  return (
    <GlobalContext.Provider
      value={{
        // can be accessed from any component we request it form using useContext
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        // only way to use the actions is to pass it down to the provider, just like transactions
        getTransactions,
        // getTransactions needs to be called.. but where?
        // call from component TransactionsList
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
