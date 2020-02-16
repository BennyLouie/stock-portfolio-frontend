import React from 'react';
import './App.css';
import { withRouter, Switch, Route, Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser, fetchUser, buyStock, signUp, clearErrors, logOut } from './thunks'
import SignInPage from './pathRenderings/SignInPage'
import SignUpPage from './pathRenderings/SignUpPage'
import HomePage from './pathRenderings/HomePage'
import PortfolioPage from './pathRenderings/PortfolioPage'
import TransactionsPage from './pathRenderings/TransactionsPage'

const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = {
  loadUser,
  fetchUser,
  buyStock,
  signUp,
  clearErrors,
  logOut
}

class App extends React.Component {

  componentDidMount() {
    this.props.loadUser()
  }

  render() {
    return (
      <div className="App">
        {this.props.errors ? (typeof (this.props.errors) === 'string' ?
          <div className="ui message">
          {<h2 className='header'>{ this.props.errors }</h2>}
          </div> 
          :
          <div className="ui message">
            <ul className='list'>
              {this.props.errors.map(error => <h2 className='header content'>{ error }</h2>)}
            </ul>
          </div>
        ) : null}
        {localStorage.token ? <div className='banner'>
          <h1 className='appName'><NavLink to="" onClick={this.props.loadUser}>Stock Portfolio App</NavLink></h1>
          <div className='links-container'>
            <div className="links">
              <NavLink to='/portfolio' onClick={this.props.loadUser}><strong>Portfolio</strong></NavLink> |
              <NavLink to='/transactions' onClick={this.props.loadUser}><strong>Transactions</strong></NavLink> |
              <NavLink to='/signin' onClick={this.props.logOut}><strong>Log Out</strong></NavLink>
            </div>
          </div>
        </div> : null}
        <Switch>
          <Route exact path='/' render={props => <HomePage market={this.props.market} user={this.props.user} stocks={this.props.stocks} buyStock={this.props.buyStock} purchaseComplete={this.props.purchase_complete} />} />
          <Route path='/signin' render={props => <SignInPage fetchUser={this.props.fetchUser} clearErrors={this.props.clearErrors} />} />
          <Route path='/signup' render={props => <SignUpPage signUp={this.props.signUp} clearErrors={this.props.clearErrors} />} />
          <Route path='/portfolio' render={props => <PortfolioPage stocks={this.props.stocks} user={this.props.user} buyStock={this.props.buyStock} purchaseComplete={this.props.purchase_complete} />} />} />
          <Route path='/transactions' render={props => <TransactionsPage transactions={this.props.transactions} />} />
        </Switch>
        {localStorage.token ? <Redirect to="" /> : <Redirect to="signin" />}
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
