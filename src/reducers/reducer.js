const initialState = {
    user: null,
    stocks: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USER":
            return {
                ...state,
                user: action.payload.user,
                stocks: action.payload.stocks
            }
        default: 
            return {
                ...state
            }
    }
}

export default reducer