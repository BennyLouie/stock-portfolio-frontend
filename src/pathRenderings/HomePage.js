import React from 'react'
import ActiveStocks from '../containers/ActiveStocks'
import CheckOut from '../components/CheckOut'

export default function HomePage(props) {
    return (
        <div className='displaypage'>
            <ActiveStocks market={props.market} stocks={props.stocks} />
            <CheckOut user={props.user} buyStock={props.buyStock} purchaseComplete={props.purchaseComplete} />
        </div>
    )
}