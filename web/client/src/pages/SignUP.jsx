import React from 'react';
import { Link } from 'react-router-dom';
import signupImage from '../images/Basketballplayers.png'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/userActions'
import { clearMessages } from '../actions/errorActions'
import { usePromiseTracker } from 'react-promise-tracker'

// Material UI Imports
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// Alert Component
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignInSide() {
  const classes = useStyles();
  // Redux hooks for store access and dispatch actions
  const dispatch = useDispatch();
  const store = useSelector(state => state);
  // Tracks asyn calls for loading overlay
  const { promiseInProgress } = usePromiseTracker();

  // React state hooks
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);

  // Submit registration information to redux actions
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password, confirmPassword)
    dispatch(registerUser({name, email, password, confirmPassword}))
    setPassword('')
    setConfirmPassword('')
  }

  // Prevents clickaway from closing alerts. Alerts will timeout or close by clicking the x
  const handleClose = (e, reason) => {
    if (reason === 'clickaway') return;
    dispatch(clearMessages());
    setOpen(false);
  }

  // Used to send alerts when the message changes
  React.useEffect(() => {
    if (!open) {
      if (store.error.message) {
        setOpen(true);
      }
    }
  }, [open, store.error.message])

  return (
    <div>
      <Backdrop className={classes.backdrop} open={promiseInProgress}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Welcome to the Team
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="Name"
                    variant="outlined"
                    required
                    fullWidth
                    id="Name"
                    label="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign UP
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link to='/login' variant="body2">
                    {"Already have an account? Log in"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={store.error.type}>
          {store.error.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

// Component styles
const useStyles = makeStyles((theme) => ({
  root: {
    height: '92vh',
  },
  image: {
    backgroundImage: 'url('+signupImage+')',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));