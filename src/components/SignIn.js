import React from 'react'
import { NavLink } from "react-router-dom"

export default class SignIn extends React.Component {
    render() {
      console.log(this.props)
        return (
            <div className="div-form">
        <form className='display-near-top form-render' onSubmit={this.props.fetchUser}>
          <h1>LOG IN</h1>
          {this.props.error ? (
            <>
              <h2 className="error">Error! Try again.</h2>
            </>
          ) : null}
          <label>
            <strong>Email:</strong>
            <input
              type="text"
              name="email"
            />
          </label>
          <label>
            <strong>Password:</strong>
            <input
              type="password"
              name="password"
            />
          </label>
          <br/>
          <input type="submit" value="Log In" className="post bold center btn" />
          <NavLink to="/signup" className="patch btn">
            <strong>Sign Up</strong>
          </NavLink>
          <br />
        </form>
      </div>
        )
    }
}