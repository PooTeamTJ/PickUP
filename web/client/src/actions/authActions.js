import { LOGIN_USER, LOGOUT_USER } from './types' 

export const loginUser = ({email, password}) => {
    console.log(email, password)
    return {
        type: LOGIN_USER,
        payload: {
            email: email,
            password: password,
            isAuth: true
        }
    }
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