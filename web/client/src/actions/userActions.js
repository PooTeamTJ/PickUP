import { 
    EDIT_USER,
    EDIT_FAIL,
    LOGIN_USER,
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

    // This call authenticates user and returns JWT from firebase
    axios.post('https://us-central1-pickup-proj.cloudfunctions.net/api/login', body, config)
        .then(res => {
            console.log(res)
            let token = res.data.token;
            localStorage.setItem('token', token)

            dispatch(loadUser(token))
        })
        .catch(err => {
            console.log(err.response)
            localStorage.removeItem('token')
            return {
                type: LOGOUT_USER,
                payload: {
                    token: null     
                }
            }
        })
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
    axios.get('https://us-central1-pickup-proj.cloudfunctions.net/api/user', auth)
    .then(res => {
        let user = {token, ...res.data.credentials}
        console.log(user)
        dispatch({
            type: LOGIN_USER,
            payload: {...user}
        })
    })
    .catch(err => {
        console.log(err.response)
        localStorage.removeItem('token')
        return {
            type: LOGOUT_USER,
            payload: null
        }
    })
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
    console.log(file)

    axios.post('https://us-central1-pickup-proj.cloudfunctions.net/api/user/imageUpload', formData, auth)
        .then(res => {
            console.log(res)
            dispatch(loadUser(user.token))
        })
        .catch(err => {
            console.log(err.response)
        })
} 

export const editUser = (property, value, user) => dispatch => {

    const auth = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + user.token,
            'Access-Control-Allow-Headers': 'Content-type, authorization'
        }
    } 

    console.log(property, value)
    let body;
    if (property === 'location') body = { ...user, location: value.location, zipcode: value.zipcode}
    else body = { ...user, [property]: value}

    switch (property) {
        case 'email':
            axios.post('https://us-central1-pickup-proj.cloudfunctions.net/api/user/updateEmail', body, auth)
                .then(res => {
                    dispatch({
                        type: EDIT_USER,
                        payload: {
                            field: 'email',
                            value
                        }
                    })
                })
                .catch(err => {
                    console.log(err.response)
                    dispatch({
                        type: EDIT_FAIL
                    })
                })
            break;
        case 'name':  
            console.log(body)
            axios.post('https://us-central1-pickup-proj.cloudfunctions.net/api/user', body, auth)
                .then(res => {
                    dispatch({
                        type: EDIT_USER,
                        payload: {
                            field: 'name',
                            value
                        }
                    })
                })
                .catch(err => {
                    console.log(err.response)
                    dispatch({
                        type: EDIT_FAIL
                    })
                })
            break;
        case 'bio':  
            console.log(body)
            axios.post('https://us-central1-pickup-proj.cloudfunctions.net/api/user', body, auth)
                .then(res => {
                    dispatch({
                        type: EDIT_USER,
                        payload: {
                            field: 'bio',
                            value
                        }
                    })
                })
                .catch(err => {
                    console.log(err.response)
                    dispatch({
                        type: EDIT_FAIL
                    })
                })
            break;
        case 'location':
            console.log(body)
            axios.post('https://us-central1-pickup-proj.cloudfunctions.net/api/user', body, auth)
                .then(res => {
                    dispatch({
                        type: EDIT_USER,
                        payload: {
                            field: 'location',
                            value
                        }
                    })
                }) 
                .catch(err => {
                    console.log(err.response)
                    dispatch({
                        type: EDIT_FAIL
                    })
                })
            break;
        default:
            return {
                type: EDIT_USER,
                payload: {

                }
            }
    }
   
}
