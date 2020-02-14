import React from 'react'
import { NavLink } from "react-router-dom"
import ActiveStocks from './ActiveStocks'
import CheckOut from '../components/CheckOut'

export default function HomePage(props) {
    return (
        <div className='homepage'>
            <ActiveStocks market={props.market} />
            <CheckOut user={props.user} buyStock={props.buyStock} />
        </div>
    )
}