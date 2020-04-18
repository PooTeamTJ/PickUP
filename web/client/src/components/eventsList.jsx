import React from 'react';
import { useSelector } from 'react-redux';

// Material UI Imports
import { Grid } from '@material-ui/core';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function SimpleExpansionPanel() {
  const classes = useStyles();
  const store = useSelector(state => state);
  console.log(store.event.events)
  return (
    <div className={classes.root}>
      <Typography className={classes.pagetitle} component='h1' variant='h4'>Your Upcoming Events</Typography>
      {store.event.events.map((event) => (
        <ExpansionPanel key={event.id}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Grid container>
              <Grid item xs={1}><SportsBasketballIcon /></Grid>
              <Grid item xs={3}><Typography className={classes.heading}>{event.title}</Typography></Grid>
              <Grid item xs={3}><Typography className={classes.date}>{event.date}</Typography></Grid>
              <Grid item xs={3}><Typography>10 / 10 Players</Typography></Grid>
            </Grid>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item><Typography>{event.description}</Typography></Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '10px',
    paddingLeft: '50px',
    width: '100%',
  },
  heading: {
    paddingLeft: '10px',
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  pagetitle: {
    paddingBottom: '10px',
  },
  date: {
    justifySelf: 'right',
  },
}));