//Auto Login with localStorage token
export const loadUser = () => dispatch => {
    const token = localStorage.getItem("token")
    if (token) {
        return fetch("https://stock-port-api.herokuapp.com/auto_login", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                dispatch({
                  type: "GET_USER",
                  payload: {
                        user: data.user,
                        stocks: data.stocks,
                        transactions: data.transactions
                  }
                })
                
        })
    }
}
// Manual Sign In with form:
export const fetchUser = evt => dispatch => {
    evt.preventDefault()
    // console.log(evt)
    return fetch("https://stock-port-api.herokuapp.com/login", {
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
            console.log(data)
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
              }
        })
}

// Async Fetch Stocks
export const fetchStocks = keys => dispatch => {
    function getData(key) {
        let url = `https://sandbox.iexapis.com/stable/stock/${key}/book?token=Tsk_75f8a00ef1ce400a9de5671974e6f490`
        return fetch(url)
                .then(resp => resp.json())
                .then(data => {
                    return data
                })
            .catch(error => {
            console.log("Error:", error)
        })
    }
    let dataFetches = []
    function doSetTimeout(i) {
        setTimeout(async function () {
            let data = await getData(keys[i])
            dataFetches.push(data)
            if (i <= 0) {
                dispatch({
                    type: "FETCH_STOCKS",
                    payload: {
                        stockData: dataFetches
                    }
                })
                return
            }
            doSetTimeout(i - 1)
        }, 50)
    }
    doSetTimeout(keys.length - 1)
}

// Get Most Active Stock Market
export const fetchMarket = () => dispatch => {
    return fetch(`https://sandbox.iexapis.com/stable/stock/market/collection/list?collectionName=mostactive&token=Tsk_75f8a00ef1ce400a9de5671974e6f490`)
                    .then(resp => resp.json())
                    .then(data => {
                        // console.log(data)
                        let parsedMarket = []
                        data.map(m => {
                            let stockInfo = {}
                            stockInfo.symbol = m.symbol
                            stockInfo.name = m.companyName
                            if (!m.open) {
                                stockInfo.opening_price = m.latestPrice
                            }
                            else {
                                stockInfo.opening_price = m.open
                            }
                            if (m.iexRealtimeSize) {
                                if (m.iexAskPrice.toString() === '0' || m.iexAskSize.toString() === '0') {
                                stockInfo.availableShares = m.iexRealtimeSize
                                stockInfo.stockPrice = m.iexRealtimePrice
                            } else {
                                stockInfo.availableShares = m.iexAskSize
                                stockInfo.stockPrice = m.iexAskPrice
                                }
                            }
                            else {
                                stockInfo.availableShares = 10 //Hard Coded Available Shares during Weekend
                                stockInfo.stockPrice = m.latestPrice
                            }
                            // console.log(parsedMarket)
                            return parsedMarket.push(stockInfo)
                        })
                        dispatch({
                            type: "GET_MARKET",
                            payload: {
                                market: parsedMarket
                            }
                        })
                })
}

// Buying Stocks
export const buyStock = (evt, user) => dispatch => {
    evt.preventDefault()
    const stock = evt.target.stock.value.toUpperCase()
    const user_id = user.id
    const quantity = evt.target.quantity.value
    let balance = user.balance
    let symbols

    return fetch("https://sandbox.iexapis.com/stable/ref-data/iex/symbols?token=Tsk_75f8a00ef1ce400a9de5671974e6f490")
        .then(resp => resp.json())
        .then(data => {
            symbols = data.map( d => d.symbol)
            // console.log(symbols.includes(stock))
            if (symbols.includes(stock)) {
                return fetch(`https://sandbox.iexapis.com/stable/stock/${stock.toLowerCase()}/book?token=Tsk_75f8a00ef1ce400a9de5671974e6f490`)
                        .then(resp => resp.json())
                        .then(data => {
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
                            return fetch('https://stock-port-api.herokuapp.com/transactions', {
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
                                                // console.log(data)
                                                dispatch({
                                                    type: 'BUY_STOCK',
                                                    payload: {
                                                        purchase_complete: `Purchase Complete! Total: $${data.price}`
                                                    }
                                                })
                                                const token = localStorage.getItem("token")
                                                return fetch(`https://stock-port-api.herokuapp.com/users/${user_id}`, {
                                                    method: 'PATCH',
                                                    headers: {
                                                        'Content-type': 'application/json',
                                                        'Accept': 'application/json',
                                                        'Authorization': `Bearer ${token}`
                                                    },
                                                    body: JSON.stringify({
                                                        balance
                                                    })
                                                })
                                            }
                                    })
                            
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

// Signing Up
export const signUp = evt => dispatch => {
    evt.preventDefault()
    const first_name = evt.target.first_name.value
    const last_name = evt.target.last_name.value
    const email = evt.target.email.value
    const password = evt.target.password.value
    const balance = 5000.00
    return fetch("https://stock-port-api.herokuapp.com/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    email,
                    password,
                    balance
                })
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.errors) {
                        dispatch({
                            type: 'ERRORS',
                            payload: {
                                errors: data.errors
                            }
                        })
                    }
                    else {
                        let token = data.jwt
                        localStorage.setItem("token", token)
                        return fetch("https://stock-port-api.herokuapp.com/auto_login", {
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
                                    if (m.iexRealtimeSize) {
                                        if (m.iexAskPrice.toString() === '0' || m.iexAskSize.toString() === '0') {
                                        stockInfo.availableShares = m.iexRealtimeSize
                                        stockInfo.stockPrice = m.iexRealtimePrice
                                    } else {
                                        stockInfo.availableShares = m.iexAskSize
                                        stockInfo.stockPrice = m.iexAskPrice
                                        }
                                    }
                                    else {
                                        stockInfo.stockPrice = m.latestPrice
                                        stockInfo.availableShares = 10 //Hard Coded Available Shares during Weekend
                                    }
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
            })
}

// LogOut
export const logOut = () => dispatch => {
    localStorage.clear()
    dispatch({
        type: 'LOGOUT'
    })
}

//Clearing Errors
export const clearErrors = () => dispatch => {
    dispatch({
        type: 'CLEAR_ERRORS'
    })
}