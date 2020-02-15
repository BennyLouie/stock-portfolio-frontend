import React from 'react'

export default function Stock(props) {
    // console.log(props)
    return (
        <div className="stock ui fluid card">
            <h4>{props.symbol} - {props.availableShares} Shares @ ${props.stockPrice}</h4>
        </div>
    )
}