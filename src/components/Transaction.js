import React from 'react'

export default function Transaction(props) {
    console.log(props)
    return (
        <div className='stock'>
            <h4><strong>BUY</strong> ({props.stock}) {props.quantity} Shares @ {Number(Math.round((props.price / props.quantity) +'e2') +'e-2')}</h4>
        </div>
    )
}