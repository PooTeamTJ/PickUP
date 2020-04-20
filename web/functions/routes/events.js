const {db, admin} = require('../util/admin')
const firebase = require('firebase')
const auth = firebase.auth()

/*
    By using the admin we get into the firestore

    we go to our collections called posts and make
    a get requests

    this returns us a query snapshot of our data and
    we want to intialize an empty array of and fill our
    array with the snapshots

    then return it in a json format
*/
exports.getAllEvents = (req, res) => {
    db.collection('events').get()
        .then(data => {
            let events = [];
            data.forEach((doc) => {
                events.push({
                    eventId: doc.id,
                    description: doc.data().description,
                    maxPeople: doc.data().maxPeople,
                    location: doc.data().location,
                    userId: doc.data().userId,
                    rosterCount: doc.data().rosterCount,
                    waitList: doc.data().waitList,
                    createdAt: doc.data().createdAt,
                    sport: doc.data().sport
                });
            })
            return res.json(events);
        })
        .catch(err => console.log(err))

}
/*
    At this end point we are going to add a event to 
    our existing data.

    We create a new object called newEvent

    we use the add method to make a post request

    if it was created succesfully we show a message

    if not we show an error message 

    const are known to be immutable but we 
    
    can still add an Id to them it is just 

    we cannot actually change their type
*/

exports.addNewEvent = (req, res) => {

    if (req.body.description.trim().length > 500){
        return res.status(400).json({ message: "The description is too long"})
    }
    const newEvent = {
        userId: req.user.userId,
        description: req.body.description,
        userImage: req.user.imageUrl,
        createdAt: new Date().toISOString(),
        maxPeople: req.body.maxPeople,
        location: req.body.location,
        sport: req.body.sport,
        time: req.body.time,
        date: req.body.date, 
        rosterCount: 0,
        waitList: 0
    }

    db.collection('events').add(newEvent)
    .then((doc) => {
        const resEvent = newEvent
        resEvent.eventId = doc.id
        res.json(resEvent)
    })
    .catch(err => {
        res.status(500).json({ error : 'Something didnt work out'})
        console.error(err)
    })
}
/*
    Get a Specific event and get the roster
    and waitlist
*/

exports.getOneEvent = (req,res) => {
    let eventData = {};
    db.doc(`/events/${req.params.eventId}`).get()
    .then((doc) =>{

        if(!doc.exists){
            return res.status(404).json({ message: "event not found"})
        }
        else {
            eventData = doc.data();
            eventData.eventId = doc.id

            return db.collection('roster').where('eventId', '==', doc.id).get()
                .then((data) => {
                    eventData.roster = [];
                    data.forEach(doc => {
                        eventData.roster.push(doc.data().userId)
                    })
                    return res.json(eventData);
                })
        }

    })
    .catch(err => {
        console.log(err);
        return res.status(500).josn({ message: err.code})
    })
}
/*
    Delete a event when we delete a event we want to 
    delete all the roster and waitlist as well
*/

exports.deleteEvent = (req, res) => {
    db.doc(`/events/${req.params.eventId}`).get()
    .then((doc) => {
        if (!doc.exists){
            return res.status(404).json({ message: "Event Not Found"});
        }
        if (doc.data().userId !== req.user.userId){
            return res.status(403).json({message: "not authorized"})
        }
        else {
            db.collection('roster').where('eventId', '==', req.params.eventId).get()
            .then((data) => {
              let batch = db.batch();

                data.forEach((doc) => {
                    batch.delete(doc.ref);
                    
                })
                return batch.commit();
             })
             .then(() => {
                 db.collection('waitList').where('eventId','==', req.params.eventId).get()
                 .then((data) =>{

                     let batch = db.batch();

                     data.forEach((doc) =>{
                         batch.delete(doc.ref);
                     })
                     return batch.commit();
                 })
             })
             .then(() => {
                 db.doc(`/events/${req.params.eventId}`).delete()
             })
             .then(() =>{
                 return res.status(200).json({ message: "post sucessfully deleted"})
             })
             .catch(err => {
                 return res.status(500).json({ error: err.code});
             })
        }
    })
}
