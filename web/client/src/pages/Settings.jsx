/*****************************/
/*                           */
/*          PAGE IS          */
/*           NOT             */
/*          IN USE           */
/*                           */
/*                           */
/*****************************/

import React from 'react';
import { connect } from 'react-redux'
import SideBar from '../components/sidebar'

// Material UI Imports
import { Grid, Typography } from '@material-ui/core';

class Settings extends React.Component {
    
    render() {   
        const history = this.props.history;

        return(
            this.props.user.token ? (
                <div>
                    <Grid container component="main">
                        <Grid item>
                            <SideBar />
                        </Grid>
                        <Grid item>
                            <Typography component='h1' variant='h4'>Settings go here</Typography>
                        </Grid>
                    </Grid>
                </div>
            ) : (
                <div>{history.push('/')}</div>
            )
        );
    };
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Settings);