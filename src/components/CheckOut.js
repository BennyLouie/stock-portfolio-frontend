import React from 'react'

export default function CheckOut(props) {
    // console.log(props.user)
    return (
        <div className='form'>
            {
                props.purchaseComplete ?
                    <h1>{props.purchaseComplete}</h1>
                    :
                    <form class='checkout' onSubmit={props.buyStock}>
                        <h1>Cash ${props.user.balance}</h1>
                        <input type='hidden' name='user_id' value={props.user.id} />
                        <label>
                            <strong>Ticker Symbol</strong>
                            <input type='text' name='stock' /> 
                        </label>
                        <label>
                            <strong>Quantity</strong>
                            <input type='text' name='quantity' />
                        </label>
                        <br />
                        <input type='submit' value='Buy' />
                    </form>
            }
        </div>
    )
}