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

export default function Stock(props) {
    // console.log(props)
    return (
        <div className="stock ui fluid card">
            <h4><span data-status={colorChange(props.stockPrice, props.opening_price)}>{props.symbol}</span> - {props.availableShares} Shares @ $<span data-status={colorChange(props.stockPrice, props.opening_price)}>{props.stockPrice}</span></h4>
        </div>
    )
}