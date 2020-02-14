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
                        stocks: data.stocks,
                        transactions: data.transactions
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
                            return parsedMarket.push(stockInfo)
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
                        stocks: data.stocks,
                        transactions: data.transactions
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

export const buyStock = evt => dispatch => {
    evt.preventDefault()
    // console.log(evt.target.user_id.value)
    const stock = evt.target.stock.value.toUpperCase()
    const user_id = evt.target.user_id.value
    const quantity = evt.target.quantity.value
    let balance = evt.target.balance.value

    return fetch('https://sandbox.iexapis.com/stable/ref-data/iex/symbols?token=Tsk_75f8a00ef1ce400a9de5671974e6f490')
        .then(resp => resp.json())
        .then(data => {
            const symbols = data.map(s => s.symbol)
            if (symbols.includes(stock)) {
                return fetch(`https://sandbox.iexapis.com/stable/stock/${stock.toLowerCase()}/book?token=Tsk_75f8a00ef1ce400a9de5671974e6f490`)
                        .then(resp => resp.json())
                        .then(data => {
                            if (data.asks['size'] < quantity || Math.round(quantity) != quantity) { //Temporary Change, Should check if the number of shares is valid
                                dispatch({
                                    type: 'BUY_STOCK',
                                    payload: {
                                        purchase_complete: 'Invalid Transaction'
                                    }
                                })
                            }
                            else {
                                let price
                                if (data.asks.length === 0) {
                                    price = data.quote.latestPrice * quantity
                                    if (data.iexRealtimeSize < quantity) {
                                        dispatch({
                                            type: 'BUY_STOCK',
                                            payload: {
                                                purchase_complete: 'Invalid Transaction'
                                            }
                                        })
                                    }
                                }
                                else {
                                    price = data.asks[0].price * quantity
                                }
                                return fetch('http://localhost:3000/transactions', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Accept': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                user_id,
                                                stock,
                                                price,
                                                quantity
                                            })
                                        })
                                            .then(resp => resp.json())
                                            .then(data => {
                                                console.log(data)
                                                if (data.errors) {
                                                    dispatch({
                                                        type: 'BUY_STOCK',
                                                        payload: {
                                                            purchase_complete: data.errors
                                                        }
                                                    })
                                                }
                                                else {
                                                    balance -= price
                                                    return fetch(`http://localhost:3000/users/${user_id}`, {
                                                        method: 'PATCH',
                                                        headers: {
                                                            'Content-type': 'application/json',
                                                            'Accept': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                            balance
                                                        })
                                                    })
                                                        .then(resp => resp.json())
                                                        .then(data => {
                                                        console.log(data)
                                                        dispatch({
                                                            type: 'BUY_STOCK',
                                                            payload: {
                                                                purchase_complete: 'Purchase Complete!'
                                                            }
                                                        })
                                                    })
                                                }
                                        })
                            }
                            
                })
            }
            else {
                dispatch({
                    type: 'BUY_STOCK',
                    payload: {
                        purchase_complete: 'We are unable to find the Stock you are looking for'
                    }
                })
            }
            
    })
}