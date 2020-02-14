import React from 'react'
import Stock from '../components/Stock'

export default function ActiveStocks(props) {
    return (
        <div className='market'>
            {props.market.map( (stock, idx) => <Stock key={idx} {...stock} />)}
        </div>
    )
}