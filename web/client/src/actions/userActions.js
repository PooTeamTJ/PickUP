import { 
    EDIT_USER,
    EDIT_FAIL,
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    MESSAGE
} from './types'

import axios from 'axios';
// trackPromise is used to keep track of active promises for use in informin ght euser when processes are running in the background
import { trackPromise } from 'react-promise-tracker';

export const registerUser = ({name, email, password, confirmPassword}) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
         }
    }

    console.log(name, email, password, confirmPassword)

    const body = JSON.stringify({name, email, password, confirmPassword})

    trackPromise(axios.post('https://us-central1-pickup-proj.cloudfunctions.net/api/signup', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_USER,
                payload: res.data
            })
            dispatch({
                type: MESSAGE,
                payload: {
                    type: 'success',
                    message: 'Registration successful! Please verify Your email before signing in!'
                }
            })
        })
        .catch(err => {
            dispatch({
                type: MESSAGE,
                payload: {
                    type: 'error',
                    ...err.response.data
                }
            })
        })
    )
}

export const loginUser = ({email, password}) => dispatch => {

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const body = JSON.stringify({email, password});

    // This call authenticates user and returns JWT from firebase
    trackPromise(axios.post('https://us-central1-pickup-proj.cloudfunctions.net/api/login', body, config)
        .then(res => {
            let token = res.data.token;
            localStorage.setItem('token', token)

            dispatch(loadUser(token))
        })
        .catch(err => {
            localStorage.removeItem('token')
            dispatch({
                type: MESSAGE,
                payload: {
                    type: 'error',
                    ...err.response.data
                }
            })
            return {
                type: LOGOUT_USER,
                payload: {
                    token: null     
                }
            }
        })
    )
}

export const loadUser = (token) => dispatch => {

    const auth = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Access-Control-Allow-Headers': 'Content-type, authorization'
        }
    } 

    // Sends JWT to middleware to decode and then retrieves use data from database
    trackPromise(axios.get('https://us-central1-pickup-proj.cloudfunctions.net/api/user', auth)
    .then(res => {
        let user = {token, ...res.data.credentials}
        dispatch({
            type: LOGIN_USER,
            payload: {...user}
        })
    })
    .catch(err => {
        localStorage.removeItem('token')
        return {
            type: LOGOUT_USER,
            payload: null
        }
    }))
}

export const logoutUser = () => {
    localStorage.removeItem('token')
    return {
        type: LOGOUT_USER,
        payload: {
            token: null     
        }
    }
}

export const imageUpload = (file, user) => dispatch => {
    const auth = {
        headers: {
            'Content-type': 'multipart/form-data', 
            'Authorization': 'Bearer ' + user.token,
            'Access-Control-Allow-Headers': 'Content-type, authorization'
        }
    } 

    var formData = new FormData();
    formData.append('profileImage', file)

    trackPromise(axios.post('https://us-central1-pickup-proj.cloudfunctions.net/api/user/imageUpload', formData, auth)
        .then(res => {
            dispatch(loadUser(user.token))
            dispatch({
                type: MESSAGE,
                payload: {
                    type: 'success',
                    ...res.data
                }
            })
        })
        .catch(err => {
            dispatch({
                type: MESSAGE,
                payload: {
                    type: 'error',
                    message: 'Image upload failed'
                }
            })
        }))
} 

export const editUser = (property, value, user) => dispatch => {

    const auth = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + user.token,
            'Access-Control-Allow-Headers': 'Content-type, authorization'
        }
    } 

    let body;
    if (property === 'location') body = { ...user, location: value.location, zipcode: value.zipcode}
    else body = { ...user, [property]: value}

    switch (property) {
        case 'email':
            trackPromise(axios.post('https://us-central1-pickup-proj.cloudfunctions.net/api/user/updateEmail', body, auth)
                .then(res => {
                    dispatch({
                        type: EDIT_USER,
                        payload: {
                            field: 'email',
                            value
                        }
                    })
                    dispatch({
                        type: MESSAGE,
                        payload: {
                            type: 'success',
                            message: 'Email updated. Please verify your new address'
                        }
                    })
                })
                .catch(err => {
                    dispatch({
                        type: EDIT_FAIL
                    })
                    dispatch({
                        type: MESSAGE,
                        payload: {
                            type: 'error',
                            message: 'Update failed'
                        }
                    })
                }))
            break;
        case 'name':  
            trackPromise(axios.post('https://us-central1-pickup-proj.cloudfunctions.net/api/user', body, auth)
                .then(res => {
                    dispatch({
                        type: EDIT_USER,
                        payload: {
                            field: 'name',
                            value
                        }
                    })
                    dispatch({
                        type: MESSAGE,
                        payload: {
                            type: 'success',
                            message: 'Updated Successfully'
                        }
                    })
                })
                .catch(err => {
                    dispatch({
                        type: EDIT_FAIL
                    })
                    dispatch({
                        type: MESSAGE,
                        payload: {
                            type: 'error',
                            message: 'Update failed'
                        }
                    })
                }))
            break;
        case 'bio':  
            trackPromise(axios.post('https://us-central1-pickup-proj.cloudfunctions.net/api/user', body, auth)
                .then(res => {
                    dispatch({
                        type: EDIT_USER,
                        payload: {
                            field: 'bio',
                            value
                        }
                    })
                    dispatch({
                        type: MESSAGE,
                        payload: {
                            type: 'success',
                            message: 'Updated Successfully'
                        }
                    })
                })
                .catch(err => {
                    dispatch({
                        type: EDIT_FAIL
                    })
                    dispatch({
                        type: MESSAGE,
                        payload: {
                            type: 'error',
                            message: 'Update failed'
                        }
                    })
                }))
            break;
        case 'location':
            trackPromise(axios.post('https://us-central1-pickup-proj.cloudfunctions.net/api/user', body, auth)
                .then(res => {
                    dispatch({
                        type: EDIT_USER,
                        payload: {
                            field: 'location',
                            value
                        }
                    })
                    dispatch({
                        type: MESSAGE,
                        payload: {
                            type: 'success',
                            message: 'Updated Successfully'
                        }
                    })
                }) 
                .catch(err => {
                    dispatch({
                        type: EDIT_FAIL
                    })
                    dispatch({
                        type: MESSAGE,
                        payload: {
                            type: 'error',
                            message: 'Update failed'
                        }
                    })
                }))
            break;
        default:
            return {
                type: EDIT_USER,
                payload: {

                }
            }
    }
   
}
