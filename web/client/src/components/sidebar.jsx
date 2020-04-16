import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Grid from '@material-ui/core/Grid';

const drawerWidth = 300;

export default function ClippedDrawer() {
  const classes = useStyles();
  const store = useSelector(state => state);
  console.log(store.user)
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
          <Avatar className={classes.avatar}>P</Avatar>
          <Typography component="h1" variant="h5" className={classes.name}>
            {store.user.name.first + ' ' + store.user.name.last}
          </Typography>
          <Grid container className={classes.rating}>
            <Grid item>{store.user.rating >= 1 ? (<StarIcon/>):(<StarBorderIcon/>)}</Grid>
            <Grid item>{store.user.rating >= 2 ? (<StarIcon/>):(<StarBorderIcon/>)}</Grid>
            <Grid item>{store.user.rating >= 3 ? (<StarIcon/>):(<StarBorderIcon/>)}</Grid>
            <Grid item>{store.user.rating >= 4 ? (<StarIcon/>):(<StarBorderIcon/>)}</Grid>
            <Grid item>{store.user.rating >= 5 ? (<StarIcon/>):(<StarBorderIcon/>)}</Grid>
          </Grid>
          <Typography component="p" className={classes.name}>
            Badges will go here
          </Typography>
        </div>
        <Button className={classes.editbutton} variant='contained' color='primary'>
          <Link to='/profile' style={{ textDecoration: 'none', color: '#fff'}}>Edit Profile</Link>
        </Button>
      </Drawer>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
    overflow: 'auto',

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