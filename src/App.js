import React from 'react';
import './App.css';
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SignIn from './components/SignIn'
import { loadUser } from './thunks'
import Portfolio from './components/Portfolio';

const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = {
  loadUser: loadUser
}

class App extends React.Component {

  componentDidMount() {
    this.props.loadUser()
  }
  
  render() {
    console.log(this.props)
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={props => <Portfolio {...this.props}/>} />
          <Route path='/signin' render={props => <SignIn />} />
        </Switch>
        {this.props.user ? <Redirect to="" /> : <Redirect to="signin" />}
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
