import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';
import { clearMessages } from '../actions/errorActions'
import loginImage from '../images/basketballcourt2.png';
import { useHistory } from 'react-router-dom';
import { usePromiseTracker } from 'react-promise-tracker'

// Material UI Imports
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// Alert component
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignInSide() {
  const classes = useStyles();
  // Redux hooksL give access to store and dispatch actions
  const dispatch = useDispatch();
  const store = useSelector(state => state);
  // Tracks async promises. Used for loading symbol while logging in 
  const { promiseInProgress } = usePromiseTracker();
  // Access to router history
  const history = useHistory();

  // React component state hooks
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  
  // Submit Login. Redirects to main page
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({email, password}))
    setPassword('')
    history.push('/')
  }

  // Closing for alerts. Prevents clicking from closing
  const handleClose = (e, reason) => {
    if (reason === 'clickaway') return;
    dispatch(clearMessages());
    setOpen(false);
  }

  React.useEffect(() => {
    if (!open) {
      if (store.error.message) {
        setOpen(true);
      }
    }
  }, [open, store.error.message])

  return (
    <div>{store.user.token && history.push('/')}
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
              Jump Back In
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link to='/register' variant="body2">
                    {"Don't have an account? Sign Up"}
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

// Class styles
const useStyles = makeStyles((theme) => ({
  root: {
    height: '92vh',
  },
  image: {
    backgroundImage: 'url('+loginImage+')',
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