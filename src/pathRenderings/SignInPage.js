import React from 'react'
import SignIn from '../components/SignIn'
import {NavLink} from 'react-router-dom'

export default function SignInPage(props) {

    return (
        <div className='displaypage form-center'>
            <div className='signup-form'>
                <SignIn fetchUser={props.fetchUser} />
                <NavLink to="/signup" className="patch btn" onClick={props.clearErrors}><strong>Sign Up</strong></NavLink>
            </div>
        </div>
    )
}