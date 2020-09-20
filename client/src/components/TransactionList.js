import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState'
import { Transaction } from './Transaction';

// any HTTP requests, need to use useEffect hook


// can pull out anything form the global state by using the useContext hook
export const TransactionList = () => {
    // const context = useContext(GlobalContext);
    // instead, lets use destructuring so we dont have to say context.transactions
    const { transactions, getTransactions } = useContext(GlobalContext);

    //getTransactions is an asunc call, so use it in useEffect hook
    useEffect(() => {
        getTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        
        // will run infinitely in loop, so need add empty array
    }, []);

    return (
        <div>
            <h3>History</h3>
            <ul className="list">
                {/* for each transaction, we want to output list items */}
                {transactions.map(transaction => (
                    <Transaction key={transaction.id} transaction={transaction} />
                ))}
            </ul>
        </div>
    )
}
