import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loadEvents, getEventData } from '../actions/eventActions';

// Material UI Imports
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

export default function SimpleExpansionPanel() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const store = useSelector(state => state);
  const [expanded, setExpanded] = React.useState('');
  React.useEffect(() => dispatch(loadEvents()), [dispatch]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    console.log(panel)
    if(store.event.events.find(event => event.eventId === panel).rosterList == null)
      dispatch(getEventData(panel))
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const formatTimeDate = (time, date) => {
    var _date = date.split('-', 3)
    var month = months[parseInt(_date[0])]
    return month + ' ' + _date[1] + ', ' + _date[2] + ' at ' + time
  }

  const getIcon = (sport) => {
    if (sport) var _sport = sport.toLowerCase()
    switch(_sport) {
      case 'basketball': return (<SportsBasketballIcon />)
      case 'football': return (<SportsFootballIcon />)
      case 'soccer': return (<SportsSoccerIcon />)
      case 'tennis': return (<SportsTennisIcon />)
      default: return (<HelpOutlineIcon />)
    }
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.pagetitle} component='h1' variant='h4'>Upcoming Events</Typography>
      {store.event.events.map((event) => (
        <ExpansionPanel key={event.eventId} expanded={expanded === event.eventId} onChange={handleChange(event.eventId)}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Grid container spacing={1}>
              <Grid item xs={1}>{getIcon(event.sport)}</Grid>
              <Grid item xs={6}><Typography className={classes.heading}>{event.description}</Typography></Grid>
              <Grid item xs={3}><Typography className={classes.date}>{formatTimeDate(event.time, event.date)}</Typography></Grid>
              <Grid item xs={2}><Typography>Players: {event.rosterCount} / {event.maxPeople}</Typography></Grid>
            </Grid>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item><Typography>{event.location}</Typography></Grid>
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
    width: '70vw',
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