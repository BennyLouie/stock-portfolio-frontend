import React from 'react';
import './App.css';
import { withRouter, Switch, Route, Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import SignIn from './components/SignIn'
import { loadUser, fetchUser, buyStock } from './thunks'
import HomePage from './containers/HomePage'
import Portfolio from './containers/Portfolio'
import Transactions from './containers/Transactions'

const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = {
  loadUser,
  fetchUser,
  buyStock
}

class App extends React.Component {

  componentDidMount() {
    this.props.loadUser()
  }

  fetchUser = evt => {
    evt.preventDefault()
    this.props.fetchUser(evt)
  }
  
  render() {
    // console.log(this.props)
    return (
      <div className="App">
        {this.props.errors ? (typeof (this.props.errors) === 'string' ?
          <div className="alert alert-dark">
          {<h2 className='error'>{ this.props.errors }</h2>}
          </div> 
          :
          <div className="alert alert-dark">
            {this.props.errors.map(error => <h2 className='error'>{ error }</h2>)}
          </div>
        ) : null}
        <div>
          <h1>Stock Portfolio App</h1>
          <div className='links'>
            <NavLink to='/portfolio'><strong>Portfolio</strong></NavLink>
            <NavLink to='/transactions'><strong>Transactions</strong></NavLink>
          </div>
        </div>
        <Switch>
          <Route exact path='/' render={props => <HomePage market={this.props.market} user={this.props.user} buyStock={this.props.buyStock} purchaseComplete={this.props.purchase_complete} />} />
          <Route path='/signin' render={props => <SignIn fetchUser={this.fetchUser} />} />
          <Route path='/portfolio' render={props => <Portfolio />} />
          <Route path='/transactions' render={props => <Transactions transactions={this.props.transactions} />} />
        </Switch>
        {localStorage.token ? <Redirect to="" /> : <Redirect to="signin" />}
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
