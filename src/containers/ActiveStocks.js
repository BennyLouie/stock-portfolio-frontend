import React from 'react'
import Stock from '../components/Stock'

export default function ActiveStocks(props) {
    // console.log(props)
    let stockNames = props.stocks.map( s => s.name)
    // console.log(stockNames)
    let marketNames = props.market.map(m => m.symbol)
    // console.log(marketNames)
    return (
        <div className='stocksdisplay'>
            <h1 className='title'>Most Active Stocks</h1>
            <div className='stockscontainer below-title ui cards'>
                {props.market.map( (stock, idx) => <Stock key={idx} {...stock} stockNames={stockNames}/>)}
            </div>
        </div>
    )
}