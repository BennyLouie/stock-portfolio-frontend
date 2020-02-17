import React from 'react'
import MyStock from '../components/MyStock'

function totalPrice(stocks) {
    let prices = stocks.map(s => s.current_price * s.shares)
    let total = Math.round((prices.reduce((t, p) => t + p, 0) * 100) / 100).toFixed(2)
    return total
}

export default function Portfolio(props) {
    console.log(props.stocks)
    console.log(totalPrice(props.stocks))
    return (
        <div className='stocksdisplay'>
            <h1 className='title'>Portfolio (${totalPrice(props.stocks)})</h1>
            <div className='stockscontainer below-title ui cards'>
                { props.stocks.map((stock, idx) => <MyStock key={idx} {...stock}  />)}
            </div>
        </div>
    )
}