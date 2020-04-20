import {
    LOAD_EVENTS,
    LOAD_FAIL,
    GET_EVENT
} from './types'

import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

export const loadEvents = () => dispatch => {
    let auth = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Access-Control-Allow-Headers': 'Content-type, authorization'
        }   
    }

    trackPromise(axios.get('https://us-central1-pickup-proj.cloudfunctions.net/api/events', auth)
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
        }))
}

export const getEventData = (eventId) => dispatch => {
    let auth = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Access-Control-Allow-Headers': 'Content-type, authorization'
        }   
    }

    trackPromise(axios.get('https://us-central1-pickup-proj.cloudfunctions.net/api/events/'+eventId, auth)
        .then(res => {
            console.log(res)
            dispatch({
                type: GET_EVENT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: LOAD_FAIL
            })
        })
    )
} 