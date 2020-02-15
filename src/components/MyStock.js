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
    console.log(props)
    return (
        <div className='stock ui fluid card'>
            <h4><span data-status={colorChange(props.current_price, props.opening_price)}>{props.name}</span> - {props.shares} Shares <span data-status={colorChange(props.current_price, props.opening_price)}>${Number(Math.round((props.current_price * props.shares) +'e2') +'e-2')}</span></h4>
        </div>
    )
}