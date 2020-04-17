import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editUser } from '../actions/userActions';

// Material UI Imports
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Avatar, Paper, Typography, IconButton, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

export default function Profile() {
    const classes = useStyles();
    const store = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();
    const [EditName = false, setEditName] = React.useState();
    const [nameField = '', setNameField] = React.useState();
    const [EditEmail = false, setEditEmail] = React.useState();
    const [emailField = '', setEmailField] = React.useState();

    const onClick = (e) => {
        console.log(e.target)
        if (e.target.id === 'editName')
        {
            setEditName(!EditName);
            setNameField('');
        }
        else if (e.target.id === 'editEmail')
        {
            setEditEmail(!EditEmail);
            setEmailField('');
        }
    }

    const handleSubmit = (e) => {
        console.log(e.target)
        e.preventDefault();
        if (e.target.id === 'name')
        {
            setEditName(false);
            dispatch(editUser(e.target.id, nameField));
        }
        else if (e.target.id === 'email')
        {
            console.log(e.target.id, emailField)
            setEditEmail(false);
            dispatch(editUser(e.target.id, emailField))
        }
    }

    return (
        store.user.isAuth ? (
            <div className={classes.root}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>{store.user.name.first}</Avatar>
                    <div className={classes.namefield}>
                        {!EditName ? (
                            <div className={classes.namefield}>
                                <Typography component="h1" variant="h5" className={classes.name}>{store.user.name.first + ' ' + store.user.name.last}</Typography>
                                <IconButton className={classes.editbutton} id='editName' onClick={onClick}><EditIcon/></IconButton>
                            </div>
                        ) : (
                            <form className={classes.namefield} id='name' onSubmit={handleSubmit}>
                                <TextField
                                    size='small'
                                    variant='outlined'
                                    margin='normal'
                                    fullWidth
                                    id='name'
                                    label='Name'
                                    autoComplete='name'
                                    value={nameField}
                                    onChange={e => setNameField(e.target.value)}
                                    autoFocus
                                />
                                <IconButton className={classes.editbutton} type='submit'><CheckIcon/></IconButton>
                                <IconButton className={classes.editbutton} id='editName' onClick={onClick}><ClearIcon/></IconButton>
                            </form>
                        )}    
                    </div>
                    <div className={classes.namefield}>
                        {!EditEmail ? (
                            <div className={classes.namefield}>
                                <Typography component="p" variant="p" className={classes.name}>{store.user.email}</Typography>
                                <IconButton className={classes.editbutton} id='editEmail' onClick={onClick}><EditIcon/></IconButton>
                            </div>
                        ) : (
                            <form className={classes.namefield} id='email' onSubmit={handleSubmit}>
                                <TextField
                                    size='small'
                                    variant='outlined'
                                    margin='normal'
                                    fullWidth
                                    id='email'
                                    label='Email Address'
                                    autoComplete='email'
                                    value={emailField}
                                    onChange={e => setEmailField(e.target.value)}
                                    autoFocus
                                />
                                <IconButton className={classes.editbutton} type='submit'><CheckIcon/></IconButton>
                                <IconButton className={classes.editbutton} id='editEmail' onClick={onClick}><ClearIcon/></IconButton>
                            </form>
                        )}
                        
                    </div>
                </Paper>
                
            </div>
        ) : (
            <div>{history.push('/')}</div>
        )
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '2vh',
        marginLeft: '25%',
        marginRight: '25%',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginTop: theme.spacing(5),
        backgroundColor: theme.palette.secondary.main,
        width: theme.spacing(25),
        height: theme.spacing(25),
    },
    name: {
        margin: theme.spacing(2),
        marginRight: theme.spacing(0),
    },
    namefield: {
        display: 'flex',
        alignItems: 'center',
    },
    editbutton: {
        // height: theme.spacing(6),
        // width: theme.spacing(6),
    },
    textfield: {
        
    },
}))