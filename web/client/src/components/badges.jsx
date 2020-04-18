import React from 'react'
import { useSelector } from 'react-redux';

// Material-UI Imports
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default function Badges() {
    const classes = useStyles();
    const store = useSelector(state => state);

    const maxBadges = 5

    return (
        <div className={classes.root}>
            {store.user.badges.slice(0, maxBadges).map((badge) => (
                    <Card variant={'outlined'} className={classes.card} elevation={1}>
                        <CardContent className={classes.content}>
                            <Typography className={classes.text}>{badge}</Typography>
                        </CardContent>
                    </Card>
            ))}
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'center',
        alignContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
        justifySelf: 'center',
        alignSelf: 'center',
    },
    nomargin: {
        margin: '0px',
        padding: '0px',
        justifyContent: 'center',
        alignContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
        justifySelf: 'center',
        alignSelf: 'center',
    },
    card: {
        margin: '2%',
        justifyContent: 'center',
        alignContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
        justifySelf: 'center',
        alignSelf: 'center',
    },
    content: {
        justifyContent: 'center',
        alignContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
        justifySelf: 'center',
        alignSelf: 'center',
    },
    text : {
        justifyContent: 'center',
        alignContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
        justifySelf: 'center',
        alignSelf: 'center',

    }
}))