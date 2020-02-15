import React from 'react'
import Stock from '../components/Stock'

export default function ActiveStocks(props) {
    // console.log(props)
    return (
        <div className='stocksdisplay'>
            <div className='stockscontainer ui cards'>
                {props.market.map( (stock, idx) => <Stock key={idx} {...stock} />)}
            </div>
        </div>
    )
}