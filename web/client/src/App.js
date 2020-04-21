import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Toolbar from '@material-ui/core/Toolbar';
import { connect } from 'react-redux'

// Pages and Components
import NavBar from './components/navbar'
import NotFoundPage from './pages/404';
import SignInSide from './pages/SignInSide';
import MainPage from './pages/MainPage';
import SignUp from './pages/SignUP';
import Settings from './pages/Settings';
import Profile from './pages/Profile'
import { loadUser } from './actions/userActions'

class App extends React.Component {

  // When the app loads it will retrieve the user token from props 
  // and retrieve the user imformation to store it in the redux state
  componentDidMount() {
    if (this.props.user.token) {
        this.props.dispatch(loadUser(this.props.user.token))
    }
  }

  render () {
    return (
      <div className='App'>
        {/* Router is used to switch between components in the site since it is a single page application */}
        <Router>
          {/* NavBar is the navbar, used for navigation */}
          {/* The toolbar component is used to prevent content from being hidden behind the navbar  */}
          <NavBar/>
          <Toolbar/>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path='/login' component={SignInSide} />
            <Route exact path='/404' component={NotFoundPage} />
            <Route exact path='/register' component={SignUp} />
            <Route exact path='/settings' component={Settings} /> {/*Currently defunct*/}
            <Route exact path='/profile' component={Profile} />
            <Redirect to='/404' />
          </Switch>
        </Router>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

export default connect(mapStateToProps)(App);