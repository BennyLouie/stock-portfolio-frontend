import React from 'react'
import Portfolio from '../containers/Portfolio'
import CheckOut from '../components/CheckOut'

export default function PortfolioPage(props) {

    return (
        <div className='displaypage'>
            <Portfolio stocks={props.stocks} shares={props.shares} />
            <CheckOut user={props.user} buyStock={props.buyStock} purchaseComplete={props.purchaseComplete} />
        </div>
    )
}