import React from 'react'

export default function SignUp(props){
    return (
    <form className='ui form' onSubmit={props.signUp}>
        <h1>SIGN UP</h1>
        {props.error ? (
        <>
            <h2 className="error">Error! Try again.</h2>
        </>
        ) : null}
        <label>
            <strong>First Name</strong>
        </label>
            <input type="text" name="first_name" placeholder='John' />
        <label>
            <strong>Last Name</strong>
        </label>
            <input type="text" name="last_name" placeholder='Doe' />
        <label>
            <strong>Email</strong>
        </label>
            <input type="text" name="email" placeholder="example@gmail.com" />
        <label>
            <strong>Password</strong>
        </label>
            <input type="password" name="password" />
        <button type="submit" className="ui button">Register Account</button>
    </form>
    )
}