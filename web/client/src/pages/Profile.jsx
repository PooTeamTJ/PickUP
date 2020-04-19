import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editUser, imageUpload } from '../actions/userActions';

// Material UI Imports
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Avatar, Paper, Typography, IconButton, TextField, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export default function Profile() {
    const classes = useStyles();
    const store = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();
    const [EditName = false, setEditName] = React.useState();
    const [nameField = '', setNameField] = React.useState();
    const [EditEmail = false, setEditEmail] = React.useState();
    const [emailField = '', setEmailField] = React.useState();
    const [EditBio = false, setEditBio] = React.useState();
    const [bio = store.user.bio, setBio] = React.useState();
    const [img = null, setImg] = React.useState();
    
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
        else if (e.target.id === 'editBio')
        {
            setEditBio(!EditBio);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.id === 'name')
        {
            setEditName(false);
            dispatch(editUser(e.target.id, nameField, store.user));
        }
        else if (e.target.id === 'email')
        {
            console.log(e.target.id, emailField)
            setEditEmail(false);
            dispatch(editUser(e.target.id, emailField, store.user))
        }
        else if (e.target.id === 'bio')
        {
            console.log(e.target.id, emailField)
            setEditBio(false);
            dispatch(editUser(e.target.id, bio, store.user))
        }
        else if (e.target.id === 'image')
        {
            console.log(e.target.files[0])
            dispatch(imageUpload(e.target.files[0], store.user))
        }
    }

    return (
        store.user.token ? (
            <div className={classes.root}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar} src={store.user.imageUrl} ></Avatar>
                    <input id='image' type='file' onChange={handleSubmit} style={{display: 'none'}} ref={fileInput => setImg(fileInput)}/>
                    <Button variant="contained" color="primary" onClick={() => img.click()}>Upload</Button>
                    {/*Edit Name*/}
                    <div className={classes.namefield}>
                        {!EditName ? (
                            <div className={classes.namefield}>
                                <Typography component="h1" variant="h5" className={classes.name}>{store.user.name}</Typography>
                                <IconButton className={classes.editbutton} id='editName' onClick={onClick}><EditIcon id='editName'/></IconButton>
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
                                <IconButton className={classes.editbutton} id='editName' onClick={onClick}><ClearIcon id='editName'/></IconButton>
                            </form>
                        )}    
                    </div>
                    {/* Edit Email: currently not working*/}
                    <div className={classes.namefield}>
                        {!EditEmail ? (
                            <div className={classes.namefield}>
                                <Typography component="p" variant="body1" className={classes.name}>{store.user.email}</Typography>
                                <IconButton className={classes.editbutton} id='editEmail' onClick={onClick}><EditIcon id='editEmail'/></IconButton>
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
                                <IconButton className={classes.editbutton} id='editEmail' onClick={onClick}><ClearIcon id='editEmail'/></IconButton>
                            </form>
                        )}
                        
                    </div>
                    {/* Edit Bio */}
                    <div className={classes.namefield}>
                        {!EditBio ? (
                            <div className={classes.namefield}>
                                <Typography component="p" variant="p" className={classes.name}>{store.user.bio}</Typography>
                                <IconButton className={classes.editbutton} id='editBio' onClick={onClick}><EditIcon id='editBio'/></IconButton>
                            </div>
                        ) : (
                            <form className={classes.namefield} id='bio' onSubmit={handleSubmit}>
                                <TextareaAutosize
                                    size='small'
                                    variant='outlined'
                                    margin='normal'
                                    fullwidth
                                    id='bio'
                                    label='Bio'
                                    value={bio}
                                    onChange={e => setBio(e.target.value)}
                                />
                                <IconButton className={classes.editbutton} type='submit'><CheckIcon/></IconButton>
                                <IconButton className={classes.editbutton} id='editBio' onClick={onClick}><ClearIcon id='editBio'/></IconButton>
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
        marginBottom: theme.spacing(2),
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
        marginLeft: '10px',
        marginRight: '10px'
    },
    editbutton: {
        // height: theme.spacing(6),
        // width: theme.spacing(6),
    },
    textfield: {
        
    },
}))