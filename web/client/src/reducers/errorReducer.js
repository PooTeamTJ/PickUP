import { REGISTER_FAIL } from '../actions/types';

const initState = {
    error: ''
}

const errorReducer = (state = initState, action) => {
    switch (action.type) {
        case REGISTER_FAIL: {
            return action.payload.message
        }
        default: return state
    }

}

export default errorReducer;