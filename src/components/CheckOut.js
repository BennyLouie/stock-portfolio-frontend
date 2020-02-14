import React from 'react'

export default function CheckOut(props) {
    console.log(props.user)
    return (
        <div className='form'>
            <form>
                <h1>Cash ${props.user.balance}</h1>
            </form>
        </div>
    )
}