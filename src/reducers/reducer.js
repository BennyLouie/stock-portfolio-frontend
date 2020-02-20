const initialState = {
    user: {},
    stocks: {},
    transactions: [],
    stockData: [],
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
                transactions: action.payload.transactions,
                stocks: action.payload.stocks,
                errors: null,
                purchase_complete: null
            }
        case "FETCH_STOCKS":
            return {
                ...state,
                stockData: action.payload.stockData,
                purchase_complete: null,
                errors: null
            }
        case "GET_MARKET":
            return {
                ...state,
                market: action.payload.market,
                purchase_complete: null,
                errors: null
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
        case "CLEAR_ERRORS":
            return {
                ...state,
                errors: null
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