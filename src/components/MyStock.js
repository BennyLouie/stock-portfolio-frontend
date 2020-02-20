import React from 'react'

//Function for Color Changing:
function colorChange(currentPrice, openingPrice) {
    if (currentPrice > openingPrice) {
        return 'green'
    }
    else if (currentPrice < openingPrice) {
        return 'red'
    }
    else {
        return 'grey'
    }
}

export default function MyStock(props) {
    function findShares(symbol, shares) {
        let num = Object.keys(shares).find(k => k === symbol)
        return shares[num]
    }
    return (
        <div className='stock ui fluid card'>
            <h4><span data-status={props.stock.quote.open ? colorChange(props.stock.quote.latestPrice, props.stock.quote.open) : colorChange(props.stock.quote.latestPrice, props.stock.quote.latestPrice)}>{props.stock.quote.symbol}</span> - {findShares(props.stock.quote.symbol, props.shares)} Shares <span data-status={props.stock.quote.open ? colorChange(props.stock.quote.latestPrice, props.stock.quote.open) : colorChange(props.stock.quote.latestPrice, props.stock.quote.latestPrice)}>${(Math.round(props.stock.quote.latestPrice * findShares(props.stock.quote.symbol, props.shares) * 100) / 100).toFixed(2)}</span></h4>
        </div>
    )
}