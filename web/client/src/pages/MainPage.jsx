import React from 'react';
import { connect } from 'react-redux'
import Info from '../components/info';
import SideBar from '../components/sidebar'
import EventsList from '../components/eventsList'
import { loadUser } from '../actions/userActions'
import { loadEvents } from '../actions/eventActions'

// Material UI Imports
import { Grid } from '@material-ui/core';

class mainPage extends React.Component {

    componentDidMount() {
        if (this.props.user.token) {
            this.props.dispatch(loadUser(this.props.user.token))
            this.props.dispatch(loadEvents())
        }
    }
    
    render() {   
        const history = this.props.history

        return(
            this.props.user.token ? (
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
                    <div>{history.push('/login')}</div>
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