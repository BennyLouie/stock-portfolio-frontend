import React from 'react'

export default function CheckOut(props) {
    console.log(props.user)
    // let user = props.user
    return (
        <div className='form'>
            {
                props.purchaseComplete ?
                    <h1>{props.purchaseComplete}</h1>
                    :
                    <form className='checkout' onSubmit={(evt, user) => props.buyStock(evt, props.user)}>
                        <h1>Cash ${props.user.balance}</h1>
                        <label>
                            <strong>Ticker Symbol</strong>
                            <input type='text' name='stock' /> 
                        </label>
                        <label>
                            <strong>Quantity</strong>
                            <input type='number' name='quantity' />
                        </label>
                        <br />
                        <input type='submit' value='Buy' />
                    </form>
            }
        </div>
    )
}