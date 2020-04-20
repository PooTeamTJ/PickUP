import { LOGOUT_USER, LOGIN_USER, REGISTER_USER, EDIT_USER } from '../actions/types';

const initState = {
    token: localStorage.getItem('token'),
    age: null,
    badges: [],
    bio: null,
    createdAt: null,
    email: null,
    eventCount: null,
    imageUrl: null,
    location: null,
    name: null,
    rating: null,
    userId: null,
    zipcode: null,
}

const userReducer = (state = initState, action) => {
    switch (action.type) { 
        case REGISTER_USER: {
            let user = action.payload

            return {
                ...user
            }
        }
        case LOGIN_USER: {
            console.log('LOGIN_USER')
            return {
                ...action.payload,
            }
        }
        case LOGOUT_USER: {
            console.log('LOGOUT_USER')
            return {
                ...state,
                token: null
            }
        }
        case EDIT_USER: {
            console.log('EDIT_USER')
            if (action.payload.field === 'location') 
                return {...state, location: action.payload.value.location, zipcode: action.payload.value.zipcode}
            return {
                ...state,
                [action.payload.field]: action.payload.value
            }
        }
        default: {
            console.log('DEFAULT')
            return state;
        }
    }
}

export default userReducer