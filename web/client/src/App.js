import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Toolbar from '@material-ui/core/Toolbar';

// Pages and Components
import NavBar from './components/navbar'
import NotFoundPage from './pages/404';
import SignInSide from './pages/SignInSide';
import MainPage from './pages/MainPage';
import SignUp from './pages/SignUP';
import Settings from './pages/Settings';
import Profile from './pages/Profile'

class App extends React.Component {

  render () {
    return (
      <div className='App'>
        <Router>
          <NavBar/>
          <Toolbar/>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path='/login' component={SignInSide} />
            <Route exact path='/404' component={NotFoundPage} />
            <Route exact path='/register' component={SignUp} />
            <Route exact path='/settings' component={Settings} />
            <Route exact path='/profile' component={Profile} />
            <Redirect to='/404' />
          </Switch>
        </Router>
      </div>
    );
  };
};

export default App;