import React from 'react'
import { NavLink } from "react-router-dom"
import ActiveStocks from '../components/ActiveStocks'

export default function HomePage(props) {
    console.log(props)
    return (
        <ActiveStocks market={props.market} />
    )
}