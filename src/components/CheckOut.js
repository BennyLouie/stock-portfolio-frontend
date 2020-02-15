import React from 'react'

export default function CheckOut(props) {
    // console.log(props.user)
    // let user = props.user
    return (
        <div className='checkout'>{
            props.purchaseComplete ?
                <h1>{props.purchaseComplete}</h1>
                :
                <form className='ui form customform' onSubmit={(evt, user) => props.buyStock(evt, props.user)}>
                    <h1>Cash ${props.user.balance}</h1>
                    <div className='field'>
                        <label>Ticker Symbol</label>
                        <input type='text' name='stock' /> 
                    </div>
                    <div className='field'>
                        <label>Quantity</label>
                        <input type='number' name='quantity' />
                    </div>
                    <button type='submit' className='ui button'>Buy</button>
                </form>
        }
        </div>
    )
}