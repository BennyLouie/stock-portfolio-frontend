import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = {

}

class App extends React.Component {

  componentDidMount() {

  }
  
  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={props => ()} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
