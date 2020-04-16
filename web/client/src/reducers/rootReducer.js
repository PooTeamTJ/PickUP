import { LOGIN_USER, LOGOUT_USER, EDIT_USER } from '../actions/types';
const initState = {
    user: {
        email: null,
        name: {
            first: 'Sam',
            last: 'Beatson',
        }, 
        isAuth: true,
        rating: 4.0,
    },
    events: [{
                title: 'Basketball',
                id: 0,
                date: '01-01-2001',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
            },
            {
                title: 'Basketball',
                id: 1,
                date: '01-01-2001',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
            },
            {
                title: 'Basketball',
                id: 2,
                date: '01-01-2001',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
            }
        ]
}

const rootReducer = (state = initState, action) => {
    if (action.type === LOGIN_USER)
    {
        let user = {
            email: action.payload.email,
            name: 'Sam Beatson',
            rating: state.user.rating,
            isAuth: true,
        }
        return {
            ...state,
            user
        }
    }
    if (action.type === LOGOUT_USER)
    {
        let user = action.payload
        return {
            ...state,
            user
        }
    }
    if (action.type === EDIT_USER)
    {
        console.log(action.payload.field, action.payload.value)
        let field = action.payload.field;
        let user = {
            ...state.user,
            [field]: action.payload.value
        }
        return {
            ...state, 
            user
        }

    }

    return state;
}

export default rootReducer;