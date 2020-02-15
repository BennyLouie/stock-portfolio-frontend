import React from 'react'
import MyStock from '../components/MyStock'

export default function Portfolio(props) {
    console.log(props)
    return (
        <div className='stocksdisplay'>
            { props.stocks.map((stock, idx) => <MyStock key={idx} {...stock}  />)}
        </div>
    )
}