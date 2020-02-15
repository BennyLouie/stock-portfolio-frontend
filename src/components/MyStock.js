import React from 'react'

export default function MyStock(props) {
    console.log(props)
    return (
        <div className='stock ui fluid card'>
            <h4>{props.name} - {props.shares} Shares ${Number(Math.round((props.current_price * props.shares) +'e2') +'e-2')}</h4>
        </div>
    )
}