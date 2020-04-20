import { MESSAGE } from '../actions/types';

const initState = {
    message: null,
    type: null
}

const errorReducer = (state = initState, action) => {
    if (action.type === MESSAGE)
        return {
            ...state,
            ...action.payload
        }

    return state

}

export default errorReducer;