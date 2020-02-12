const initialState = {
    user: null,
    token: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_USER":
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user
            }
        default: 
            return {
                ...state
            }
    }
}

export default reducer