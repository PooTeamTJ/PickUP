import {
    LOAD_EVENTS,
    GET_EVENT
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
        case GET_EVENT:
            let updatedEvent = action.payload
            let events = state.events
            let newEvents = []
            for (let i = 0; i < events.length; i++)
            {
                if (events[i].eventId === updatedEvent.eventId)
                    newEvents.push(updatedEvent)
                else
                    newEvents.push(events[i])
            }
            return {
                ...state,
                events: newEvents
            }
        default:
            return state
    }
}

export default eventReducer