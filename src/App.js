import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Signup from './pages/Signup';

import { auth } from './services/firebase';
import "firebase/auth";

function PrivateRoute({ Component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

function PublicRoute({ Component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/chat', state: { from: props.location } }} />}
    />
  )
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: true,
        });
      }
    })
  }

  render() {
    return this.state.loading === true ? <h2>Cargando...</h2> : (
      <Route>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/chat" authenticated={this.state.authenticated} component={Chat} />
          <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup} />
          <PublicRoute path="/login" authenticated={this.state.authenticated} component={Login} />
        </Switch>
      </Route>
    );
  }
}






export default App;
