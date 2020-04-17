import React from 'react';
import { connect } from 'react-redux'
import Info from '../components/info';
import SideBar from '../components/sidebar'
import EventsList from '../components/eventsList'

// Material UI Imports
import { Grid } from '@material-ui/core';

class mainPage extends React.Component {
    
    render() {   
        const history = this.props.history

        return(
            this.props.user.isAuth ? (
                <div>
                    <Grid container component="main">
                        <Grid item>
                            <SideBar />
                        </Grid>
                        <Grid item>
                            <EventsList/>
                        </Grid>
                    </Grid>
                </div>
            ) : (
                <div>
                    <Info />
                    {/* <div>{history.push('/login')}</div> */}
                </div>
            )

        );
    };
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(mainPage);