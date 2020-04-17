import { 
    EDIT_USER,
    LOGIN_USER,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_USER,
    REGISTER_USER,
    REGISTER_FAIL
} from './types'

import axios from 'axios';

export const registerUser = ({name, email, password, confirmPassword}) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
         }
    }

    console.log(name, email, password, confirmPassword)

    const body = JSON.stringify({name, email, password, confirmPassword})

    axios.post('https://us-central1-pickup-proj.cloudfunctions.net/api/signup', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_USER,
                payload: res.data
            })
            console.log(res)
        })
        .catch(err => {
            console.log(err.response)
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data
            })
        })
}

export const loginUser = ({email, password}) => dispatch => {
    console.log(email, password)

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const body = JSON.stringify({email, password});

    axios.post('https://us-central1-pickup-proj.cloudfunctions.net/api/login', body, config)
        .then(res => {
            console.log(res)
            dispatch({
                type:LOGIN_USER,
                payload: {},
            })
        })
        .catch(err => {
            dispatch({
                type: LOGIN_FAIL,
            })
        })

    // return (dispatch, getState) => {
    //     // make database call
    //     dispatch({
    //         type: LOGIN_USER,
    //         payload: {
    //             // response from databse
    //             email,
    //             password,
    //             isAuth: true
    //         }
    //     })
    // }
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER,
        payload: {
            email: null,
            password: null,
            isAuth: false,
            
        }
    }
}

export const editUser = (property, value) => {

    console.log(property, value)
    switch (property) {
        case 'email':
            return {
                type: EDIT_USER,
                payload: {
                    field: 'email',
                    value
                }
            }
        case 'name':  
            return {
                type: EDIT_USER,
                payload: {
                    field: 'name',
                    value
                }
            }
        
        default:
            return {
                type: EDIT_USER,
                payload: {

                }
            }
    }
   
}