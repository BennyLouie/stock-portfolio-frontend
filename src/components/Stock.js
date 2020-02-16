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

function owned(name, stockNames) {
    if (stockNames.includes(name)) {
        return true
    }
    else {
        return false
    }
}

export default function Stock(props) {
    console.log(owned(props.symbol, props.stockNames))

    return (
        <div className="stock ui fluid card">
            <h4><span data-status={colorChange(props.stockPrice, props.opening_price)}>{props.symbol}</span> - {props.availableShares} Shares @ $<span data-status={colorChange(props.stockPrice, props.opening_price)}>{(Math.round(props.stockPrice * 100) / 100).toFixed(2)}</span> {owned(props.symbol, props.stockNames) ? <span>Owned</span> : null}</h4>
        </div>
    )
}