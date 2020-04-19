import {
    LOAD_EVENTS,
    LOAD_FAIL
} from './types'

import axios from 'axios';

export const loadEvents = () => dispatch => {
    let auth = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Access-Control-Allow-Headers': 'Content-type, authorization'
        }   
    }

    axios.get('https://us-central1-pickup-proj.cloudfunctions.net/api/events', auth)
        .then(res => {
            console.log(res)
            dispatch({
                type: LOAD_EVENTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: LOAD_FAIL
            })
        })
}