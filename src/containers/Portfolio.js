import React from 'react'
import MyStock from '../components/MyStock'

export default function Portfolio(props) {
    return (
        <div className='stocksdisplay'>
            <h1 className='title'>Portfolio</h1>
            <div className='stockscontainer below-title ui cards'>
                { props.stocks.map((stock, idx) => <MyStock key={idx} stock={stock} shares={props.shares}  />)}
            </div>
        </div>
    )
}