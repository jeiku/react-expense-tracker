// Reducer: how we specify application state changes in response to certain actions to our store/context

export default (state, action) => {
    //switch based on type, which is like an ID
    switch(action.type) {
        case 'GET_TRANSACTIONS':
            return {
                // whatever is in our state
                ...state,
                // false, because transactions were fetched
                loading: false,
                // starts off as empty array, so fill with payload
                transactions: action.payload

            }
        case 'ADD_TRANSACTION':
            return {
                // cant just change state
                // have to create new one and send it down
                ...state,
                // payload gets put on top before the rest of state
                // but when fetch from api, most current is at the end
                // so switch them
                        //transactions: [action.payload, ...state.transactions]
                transactions: [...state.transactions, action.payload]
            }
        case 'DELETE_TRANSACTION':
            return {
                // cant just change state
                // have to create new one and send it down
                ...state,
                // want to return ever transaction except for one with certain id
                // returns all that pass the test (do not equal the id)
                transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
            }
        case 'TRANSACTION_ERROR':
            return {
                ...state,
                // can access this in components if want to create an alert or something
                error: action.payload
            }
        // if default, return state as is
        default:
            return state;
    }
}