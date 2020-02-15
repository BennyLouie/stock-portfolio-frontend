import React from 'react'
import SignUp from '../components/SignUp'
import {NavLink} from 'react-router-dom'

export default function SignInPage(props) {

    return (
        <div className='displaypage form-center'>
            <div className='signup-form'>
                <SignUp signUp={props.signUp} />
                <NavLink to="/signin" className="patch btn"><strong>Sign In</strong></NavLink>
            </div>
        </div>
    )
}