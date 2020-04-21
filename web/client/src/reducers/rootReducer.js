import userReducer from './userReducer';
import eventReducer from './eventReducer';
import errorReducer from './errorReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    user: userReducer,
    event: eventReducer,
    error: errorReducer,
})

export default rootReducer;