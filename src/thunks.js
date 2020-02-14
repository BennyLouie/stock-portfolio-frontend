//Auto Login with localStorage token
export const loadUser = () => dispatch => {
    const token = localStorage.getItem("token")
    // console.log(token)
    if (token) {
        return fetch("http://localhost:3000/auto_login", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(resp => resp.json())
            .then(data => {
                dispatch({
                  type: "GET_USER",
                  payload: {
                        user: data.user,
                        stocks: data.stocks
                  }
                })
                return fetch(`https://sandbox.iexapis.com/stable/stock/market/collection/list?collectionName=mostactive&token=Tsk_75f8a00ef1ce400a9de5671974e6f490`)
                    .then(resp => resp.json())
                    .then(data => {
                        let parsedMarket = []
                        data.map(m => {
                            let stockInfo = {}
                            stockInfo.symbol = m.symbol
                            stockInfo.name = m.companyName
                            stockInfo.availableShares = m.iexAskSize
                            stockInfo.stockPrice = m.iexAskPrice
                            parsedMarket.push(stockInfo)
                        })
                        dispatch({
                            type: "GET_MARKET",
                            payload: {
                                market: parsedMarket
                            }
                        })
                })
        })
    }
}
// Manual Sign In with form:
export const fetchUser = evt => dispatch => {
    evt.preventDefault()
    return fetch("http://localhost:3000/login", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email: evt.target.email.value,
            password: evt.target.password.value
        })
    })
        .then(resp => resp.json())
        .then(data => {
            if (data.errors) {
                dispatch({
                  type: "ERRORS",
                  payload: {
                    errors: data.errors
                  }
                })
            } else {
                localStorage.setItem("token", data.jwt)
                dispatch({
                    type: "GET_USER",
                    payload: {
                        user: data.user,
                        stocks: data.stocks
                    }
                })
                return fetch(`https://sandbox.iexapis.com/stable/stock/market/collection/list?collectionName=mostactive&token=Tsk_75f8a00ef1ce400a9de5671974e6f490`)
                    .then(resp => resp.json())
                    .then(data => {
                        let parsedMarket = data.map(m => {
                            let stockInfo = {}
                            stockInfo.symbol = m.symbol
                            stockInfo.name = m.companyName
                            stockInfo.availableShares = m.iexAskSize
                            stockInfo.stockPrice = m.iexAskPrice
                            return stockInfo
                        })
                        dispatch({
                            type: "GET_MARKET",
                            payload: {
                                market: parsedMarket
                            }
                        })
                })
              }
        })
}

