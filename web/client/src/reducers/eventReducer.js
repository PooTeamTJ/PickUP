const initState = {
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

const eventReducer = (state = initState, action) => {
    return state
}

export default eventReducer