/*
    This is our schema we dont actually need this 
    but it is good practice to do so.

    Firebase charges you according the amount of
    reads that you do. By doing this we will
    save a lot of money
*/

let db = {
    users: [
        {
            bio: '',
            userId: 'blah@#$$$45678',
            email: 'blah@gmail.com',
            rating: 3.5,
            createdAt: '2019-03-15T10:59:52.798Z',
            imageUrl: 'image/bladddd/svfdvdz',
            age: 35,
            address: '',
            zip: 32826,

        }
        
    ],
    events : [
        {
            uid: "164516541fwvfsv",
            maxPeople: 20,
            location: "12100 University ln",
            time: "22:30:TZ",
            sport: "Tennis",
            description: ""
        }
    ]
}