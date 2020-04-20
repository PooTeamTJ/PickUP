const {db} = require('../util/admin')

exports.eventTag = (req, res) => {
/*
    First lets check if you have tagged already
    if you tagged, you are either in the roster collection
    or in the waitlist collection
*/

const tagDocRoster = db.collection('roster').where('userId', '==', req.user.userId).where('eventId', '==', req.params.eventId).limit(1)
const tagDocWaitlist = db.collection('waitList').where('userId', '==', req.user.userId).where('eventId', '==', req.params.eventId).limit(1)
const eventDoc = db.doc(`/events/${req.params.eventId}`);

let eventData = {};

eventDoc.get()
    .then((doc) => {
        /*
            Checking if the event actually exists
        */
       if(doc.exists){
          /*
             if the event exists store the 
             data and its id
         */
         eventData = doc.data();
         eventData.eventId = doc.id;
         eventData.maxPeople = doc.data().maxPeople,
         eventData.rosterCount = doc.data().rosterCount

         return tagDocRoster.get();
       }

       else {
        return res.status(404).json({ message: "event not found"});
       }

       
    })
    .then((data) => {
        /*
            If you have not been tagged yet 
            go ahead and get tagged
        */
        if (data.empty){
            tagDocWaitlist.get()
            .then((data2) => {
                if(data2.empty){
                    if (eventData.rosterCount < eventData.maxPeople){
                        return db.collection('roster').add({
                            eventId: req.params.eventId,
                            userId: req.user.userId,
                            createdAt: new Date().toISOString()
                        })
                        .then(() => {
                            eventData.rosterCount++
                            return eventDoc.update({rosterCount: eventData.rosterCount})
                        })
                        .then(() => {
                            return res.json(eventData);
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    }
                    else {
                        return db.collection('waitList').add({
                            eventId: req.params.eventId,
                            userId: req.user.userId,
                            createdAt: new Date().toISOString()
                        })
                        .then(() => {
                            eventData.waitList++
                            return eventDoc.update({waitList: eventData.waitList})
                        })
                        .then(() => {
                            return res.json(eventData);
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    }
                }
                else {
                    return res.status(400).json({ message: 'Already tagged'})
                }
            })
        }
        else {
            return res.status(400).json({ message: 'Already Tagged'})
        }

    })

}

/*
    Untaggin yourself
*/

exports.unEventTag = (req, res) => {
    /*
        First lets check if you have tagged already
        if you tagged, you are either in the roster collection
        or in the waitlist collection
    */
    
    const tagDocRoster = db.collection('roster').where('userId', '==', req.user.userId).where('eventId', '==', req.params.eventId).limit(1)
    const tagDocWaitlist = db.collection('waitList').where('userId', '==', req.user.userId).where('eventId', '==', req.params.eventId).limit(1)
    const eventDoc = db.doc(`/events/${req.params.eventId}`);
    
    let eventData = {};
    
    eventDoc.get()
        .then((doc) => {
            /*
                Checking if the event actually exists
            */
           if(doc.exists){
              /*
                 if the event exists
                  store the 
                 data and its id
             */
             eventData = doc.data();
             eventData.eventId = doc.id;
             eventData.maxPeople = doc.data().maxPeople,
             eventData.rosterCount = doc.data().rosterCount
    
             return tagDocRoster.get();
           }
    
           else {
            return res.status(404).json({ message: "event not found"});
           }
    
           
        })
        .then((data) => {
            /*
                If you have not been tagged yet 
                go ahead and get tagged
            */
            // console.log(data)
            if (data.empty){
                tagDocWaitlist.get()
                .then((data2) => {
                    if(data2.empty){
                        return res.status(400).json({ message: 'you have never been tagged in the first place'})
                    }
                    else {
                        return db.doc(`/waitList/${data2.docs[0].id}`).delete()
                        .then(() => {
                            eventData.waitList--
                            return eventDoc.update({ waitList: eventData.waitList})
                        })
                        .then(() => {
                            return res.json(eventData)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    }
                })
            }
            else {
                if (eventData.rosterCount <= eventData.maxPeople && eventData.waitList == 0){
                    // console.log("in lifr")
                    return db.doc(`/roster/${data.docs[0].id}`).delete()
                    .then(() => {
                        eventData.rosterCount--
                        return eventDoc.update({ rosterCount: eventData.rosterCount})
                    })
                    .then(() => {
                        return res.json(eventData)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
                else {
                    // console.log("i am here")
                    const temp = db.collection('waitList').where("eventId", "==", req.params.eventId).limit(1)
                    return db.doc(`/roster/${data.docs[0].id}`).delete()
                    .then(() => {
                            return temp.get()
                            
                            .then((data) =>{
                                
                                return db.doc(`/waitList/${data.docs[0].id}`).get()
                                .then((doc) =>{
                                    return db.collection('roster').add({
                                        createdAt: doc.data().createdAt,
                                        userId: doc.data().userId,
                                        eventId: req.params.eventId
                                    })
                                    .then(() => {
                                        return db.doc(`/waitList/${data.docs[0].id}`).delete()
                                    })
                                    .then(() =>{
                                        eventData.waitList--
                                        return eventDoc.update({ waitList: eventData.waitList})
                                    })
                                    .then(() => {
                                        return res.json(eventData)
                                    })
                                })
                            })
                           
                            .catch((err) => {
                                console.log(err)
                            })
                        

                    }) 
                    .catch((err) => {
                        console.log(err)
                    })                  
                }
            }
    
        })
    
    }
