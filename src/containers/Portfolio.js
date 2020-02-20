import React from 'react'
import MyStock from '../components/MyStock'

function totalPrice(stocks, shares) {
    // console.log(stocks)
    // console.log(shares)
    function findShares(symbol, shares) {
        let num = Object.keys(shares).find(k => k === symbol)
        return shares[num]
    }

    let prices = stocks.map(s => s.quote.latestPrice * findShares(s.quote.symbol, shares))
    let total = Math.round((prices.reduce((t, p) => t + p, 0) * 100) / 100).toFixed(2)
    return total
}

export default function Portfolio(props) {
    // console.log(props)
    return (
        <div className='stocksdisplay'>
            <h1 className='title'>Portfolio (${totalPrice(props.stocks, props.shares)})</h1>
            <div className='stockscontainer below-title ui cards'>
                { props.stocks.map((stock, idx) => <MyStock key={idx} stock={stock} shares={props.shares}/>)}
            </div>
        </div>
    )
}