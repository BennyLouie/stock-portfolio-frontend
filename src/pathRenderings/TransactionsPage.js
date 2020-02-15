import React from 'react'
import Transactions from '../containers/Transactions'


export default function TransactionsPage(props) {
    console.log(props)
    return (
        <div className='displaypage'>
            <Transactions transactions={props.transactions} />
        </div>
    )
}