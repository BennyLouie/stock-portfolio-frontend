import React from 'react'
import Transaction from '../components/Transaction'

export default function Transactions(props) {
    // console.log(props)
    return (
        <div className='stocksdisplay'>
            <div className='stockscontainer ui cards'>
                {props.transactions.map( (t, idx) => <Transaction key={idx} {...t} />)}
            </div>
        </div>
    )
}