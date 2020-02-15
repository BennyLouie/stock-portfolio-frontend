import React from 'react';
import './App.css';
import { withRouter, Switch, Route, Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser, fetchUser, buyStock, signUp } from './thunks'
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
  signUp
}

class App extends React.Component {

  componentDidMount() {
    this.props.loadUser()
  }

  render() {
    // console.log(this.props)
    return (
      <div className="App">
        {/* {this.props.errors ? (typeof (this.props.errors) === 'string' ?
          <div className="alert alert-dark">
          {<h2 className='error'>{ this.props.errors }</h2>}
          </div> 
          :
          <div className="alert alert-dark">
            {this.props.errors.map(error => <h2 className='error'>{ error }</h2>)}
          </div>
        ) : null} */}
        {localStorage.token ? <div className='banner'>
          <h1 className='appName'>Stock Portfolio App</h1>
          <div className='links-container'>
            <div className="links">
              <NavLink to='/portfolio'><strong>Portfolio</strong></NavLink> |
              <NavLink to='/transactions'><strong>Transactions</strong></NavLink>
            </div>
          </div>
        </div> : null}
        <Switch>
          <Route exact path='/' render={props => <HomePage market={this.props.market} user={this.props.user} buyStock={this.props.buyStock} purchaseComplete={this.props.purchase_complete} />} />
          <Route path='/signin' render={props => <SignInPage fetchUser={this.props.fetchUser} />} />
          <Route path='/signup' render={props => <SignUpPage signUp={this.props.signUp} />} />
          <Route path='/portfolio' render={props => <PortfolioPage stocks={this.props.stocks} user={this.props.user} buyStock={this.props.buyStock} purchaseComplete={this.props.purchase_complete} />} />} />
          <Route path='/transactions' render={props => <TransactionsPage transactions={this.props.transactions} />} />
        </Switch>
        {localStorage.token ? <Redirect to="" /> : <Redirect to="signin" />}
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
