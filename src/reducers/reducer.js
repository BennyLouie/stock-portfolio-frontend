const initialState = {
    user: {},
    stocks: [],
    transactions: [],
    market: [],
    purchase_complete: null,
    errors: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ERRORS":
            return {
                ...state,
                errors: action.payload.errors
            }
        case "GET_USER":
            return {
                ...state,
                user: action.payload.user,
                stocks: action.payload.stocks,
                transactions: action.payload.transactions,
                errors: null
            }
        case "GET_MARKET":
            return {
                ...state,
                market: action.payload.market
            }
        case "BUY_STOCK":
            return {
                ...state,
                purchase_complete: action.payload.purchase_complete
            }
        case "SIGN_UP":
            return {
                ...state,
                user: action.payload.user
            }
        case "LOGOUT":
            return {
                ...initialState
            }
        default: 
            return {
                ...state
            }
    }
}

export default reducer