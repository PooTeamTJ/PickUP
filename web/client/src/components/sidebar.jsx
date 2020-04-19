import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Badges from './badges';

// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Grid from '@material-ui/core/Grid';

const drawerWidth = 300;

export default function ClippedDrawer() {
  const classes = useStyles();
  const store = useSelector(state => state);
  const history = useHistory();

  const handleClick = (e) => {
    console.log(e.target.id)
    e.preventDefault();
    history.push(e.target.id)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <Avatar className={classes.avatar} src={store.user.imageUrl} />
          <Typography component="h1" variant="h5" className={classes.name}> 
            {store.user.name}
          </Typography>
          <Grid container className={classes.rating}>
            <Grid item>{store.user.rating >= 1 ? (<StarIcon/>):(<StarBorderIcon/>)}</Grid>
            <Grid item>{store.user.rating >= 2 ? (<StarIcon/>):(<StarBorderIcon/>)}</Grid>
            <Grid item>{store.user.rating >= 3 ? (<StarIcon/>):(<StarBorderIcon/>)}</Grid>
            <Grid item>{store.user.rating >= 4 ? (<StarIcon/>):(<StarBorderIcon/>)}</Grid>
            <Grid item>{store.user.rating >= 5 ? (<StarIcon/>):(<StarBorderIcon/>)}</Grid>
          </Grid>
          <Badges />
        </div>
        <Button id='/profile' onClick={handleClick} className={classes.editbutton} variant='contained' color='primary'>
          <Link id='/profile' to='/profile' style={{ textDecoration: 'none', color: '#fff'}}>Edit Profile</Link>
        </Button>
      </Drawer>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    height: '100vh', 
    alignItems: 'center',
  },
  drawerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    justifySelf: 'center',
    justifyItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(5),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(15),
    height: theme.spacing(15),
    justifySelf: 'center',
    justifyContent: 'center',
    justifyItems: 'center'
  },
  name: {
    textAlign: 'center',
  },
  editbutton: {
    position: 'absolute',
    bottom: '30px',
  },
  rating: {
    paddingTop: '10px',
    paddingBottom: '10px',
    justifyContent: 'space-evenly',
    spacing: '3'
  },
}));