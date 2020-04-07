import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

import NotFoundPage from './pages/404';
import LoginPage from './pages/loginPage';
import AboutPage from './pages/about';
import RegisterPage from './pages/registerPage';

class App extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={AboutPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/404' component={NotFoundPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Redirect to='/404' />
        </Switch>
      </Router>
    );
  };
};

export default App;