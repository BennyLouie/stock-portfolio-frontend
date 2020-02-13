const initialState = {
    user: null,
    stocks: null,
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
        default: 
            return {
                ...state
            }
    }
}

export default reducer