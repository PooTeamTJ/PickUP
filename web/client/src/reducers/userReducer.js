import { LOGOUT_USER, LOGIN_USER, REGISTER_USER } from '../actions/types';

const initState = {
    token: null,
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
    console.log(action.type)
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
                token: action.payload.token
            }
        }
        default: {
            console.log('DEFAULT')
            return state;
        }
    }
}

export default userReducer