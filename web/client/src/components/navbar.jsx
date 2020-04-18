import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions'

// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

export default function MenuAppBar() {
    
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logoutUser());
        history.push('/');
    }

    return (
        <div className={classes.root} >
            <AppBar className={classes.appbar}>
                <Toolbar>
                    <Typography edge="start" variant="h4" className={classes.title}>
                        <Link to='/' style={{ textDecoration: 'none', color: '#fff'}}>PickUP</Link>
                    </Typography>
                    {state.user.token ? (
                        <div>
                            {/* <Button>
                                <Link to='/profile' style={{ textDecoration: 'none', color: '#c4c4c4'}}>Edit Profile</Link>
                            </Button> */}
                            <Button>
                                <Link to='/settings' style={{ textDecoration: 'none', color: '#fff'}}>Settings</Link>
                            </Button>
                            <Button onClick={handleLogout} id='logout' style={{ textDecoration: 'none', color: '#fff'}}>Logout</Button>
                        </div>
                    ) : (
                        <div>
                            <Button>
                                <Link to='/login' style={{ textDecoration: 'none', color: '#fff'}}>Login</Link>
                            </Button>
                            <Button>
                                <Link to='/register' style={{ textDecoration: 'none', color: '#fff'}}>Sign UP</Link>
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appbar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  }));