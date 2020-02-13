import React from 'react'
import { NavLink } from "react-router-dom"

export default class HomePage extends React.Component {
    render() {
        console.log(this.props)
        return (
            <h1>HomePage</h1>
        )
    }
}