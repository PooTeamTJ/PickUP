import { LOGIN_USER, REGISTER_USER } from '../actions/types';

const initState = {
    token: null,
    email: null,
    name: null, 
    isAuth: false,
    rating: null,
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
            return {
                ...state,
                token: action.payload
            }
        }
        default: return state;
    }
}

export default userReducer