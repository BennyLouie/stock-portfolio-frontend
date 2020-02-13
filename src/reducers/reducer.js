const initialState = {
    user: null,
    stocks: null,
    market: null,
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
                errors: null
            }
        case "GET_MARKET":
            return {
                ...state,
                market: action.payload.market
            }
        default: 
            return {
                ...state
            }
    }
}

export default reducer