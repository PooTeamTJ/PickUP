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
            action.payload.sort((a,b) => (a.date.substring(3,5) < b.date.substring(3,5)) ? -1 : 1 )
            action.payload.sort((a,b) => (a.date.substring(0,2) < b.date.substring(0,2)) ? -1 : 1 )
            action.payload.sort((a,b) => (a.date.substring(6) < b.date.substring(6)) ? -1 : 1 )
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