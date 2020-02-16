import React from 'react'
import { NavLink } from "react-router-dom"
import ActiveStocks from '../containers/ActiveStocks'
import CheckOut from '../components/CheckOut'

export default function HomePage(props) {
    // console.log(props)
    return (
        <div className='displaypage'>
            <ActiveStocks market={props.market} stocks={props.stocks} />
            <CheckOut user={props.user} buyStock={props.buyStock} purchaseComplete={props.purchaseComplete} />
        </div>
    )
}