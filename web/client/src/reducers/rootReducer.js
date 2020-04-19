import userReducer from './userReducer';
import eventReducer from './eventReducer';
import errorReducer from './errorReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    user: userReducer,
    event: eventReducer,
    error: errorReducer,
})

// const rootReducer = (state = initState, action) => {
//     if (action.type === LOGIN_USER)
//     {
//         let user = {
//             email: action.payload.email,
//             name: 'Sam Beatson',
//             rating: state.user.rating,
//             isAuth: true,
//         }
//         return {
//             ...state,
//             user
//         }
//     }
//     if (action.type === LOGOUT_USER)
//     {
//         let user = action.payload
//         return {
//             ...state,
//             user
//         }
//     }
//     if (action.type === EDIT_USER)
//     {
//         console.log(action.payload.field, action.payload.value)
//         let field = action.payload.field;
//         let user = {
//             ...state.user,
//             [field]: action.payload.value
//         }
//         return {
//             ...state, 
//             user
//         }

//     }

//     return state;
// }

export default rootReducer;