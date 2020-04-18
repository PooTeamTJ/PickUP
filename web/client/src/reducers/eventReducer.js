import {
    LOAD_EVENTS,
} from '../actions/types'

const initState = {
    events: []
}

const eventReducer = (state = initState, action) => {
    switch (action.type) {
        case LOAD_EVENTS:
            return {
                events: action.payload
            }
        default:
            return state
    }
}

export default eventReducer