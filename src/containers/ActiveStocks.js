import React from 'react'
import Stock from '../components/Stock'

export default function ActiveStocks(props) {
    return (
        <div className='stocksdisplay'>
            <h1 className='title'>Most Active Stocks</h1>
            <div className='stockscontainer below-title ui cards'>
                {props.market.map( (stock, idx) => <Stock key={idx} {...stock} />)}
            </div>
        </div>
    )
}