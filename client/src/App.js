import React from "react";
import {Header} from "./components/Header";
import {Balance} from "./components/Balance";
import {IncomeExpenses} from "./components/IncomeExpenses";
import {TransactionList} from "./components/TransactionList";
import {AddTransaction} from "./components/AddTransaction";
import {Route, Switch, BrowserRouter} from "react-router-dom";

import {GlobalProvider, GlobalContext} from "./context/GlobalState";

import "./App.css";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter basename='/React'>
        <Switch>
          <Route path='/'>
            <Header />
            <div className='container'>
              <Balance />
              <IncomeExpenses />
              <TransactionList />
              <AddTransaction />
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
