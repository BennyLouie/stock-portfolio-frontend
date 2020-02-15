import React from 'react'
import { NavLink } from "react-router-dom"

export default class SignIn extends React.Component {
    render() {
      // console.log(this.props)
        return (
        <form className='ui form' onSubmit={this.props.fetchUser}>
          <h1>LOG IN</h1>
          {this.props.error ? (
            <>
              <h2 className="error">Error! Try again.</h2>
            </>
          ) : null}
          <label>
            <strong>Email</strong>
            <input type="text" name="email" placeholder='example@gmail.com' />
          </label>
          <label>
            <strong>Password</strong>
            <input type="password" name="password" placeholder='Insert Password' />
          </label>
          <button type="submit" className="ui button">Log In</button>
        </form>
        )
    }
}