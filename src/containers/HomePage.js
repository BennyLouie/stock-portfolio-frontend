import React from 'react'
import { NavLink } from "react-router-dom"
import ActiveStocks from './ActiveStocks'

export default function HomePage(props) {
    return (
        <ActiveStocks {...props} />
    )
}