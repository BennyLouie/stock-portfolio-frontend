import React from 'react'
import SignIn from '../components/SignIn'
import {NavLink} from 'react-router-dom'

export default function SignInPage(props) {

    return (
        <div className='displaypage form-center'>
            <div className='signup-form'>
                <SignIn fetchUser={props.fetchUser} />
                <NavLink to="/signin" className="patch btn"><strong>Sign Up</strong></NavLink>
            </div>
        </div>
    )
}