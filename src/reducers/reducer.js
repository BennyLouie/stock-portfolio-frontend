const initialState = {
    user: null,
    token: null,
    stocks: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USER":
            return {
                ...state,
                token: action.payload.token,
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