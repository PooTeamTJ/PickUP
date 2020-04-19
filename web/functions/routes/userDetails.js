const {db} = require('../util/admin')

/*
    This is a route where we add
    our user credentials
*/

exports.editUserDetails = (req, res) => {
    // if (req.body.bio.trim().length > 150){
    //     return res.status(400).json({ message: 'Too many words'})
    // }
    const userDetails = {
        name: req.body.name,
        bio: req.body.bio,
        location: req.body.location,
        age: req.body.age
    }

    db.doc(`users/${req.body.email}`).update(userDetails)
    .then(() => {
        res.json({ message: 'Profile updates'})
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ message: err.code})
    })
}

/*
    Get you user details and events and events that 
    you are in a roster
*/

exports.getUserDetails = (req, res) => {
    let userData = {}
    db.doc(`users/${req.user.email}`).get()
    .then((doc) => {
        if (doc.exists){
            userData.credentials = doc.data();
            return db.collection('events').where("userId", "==", req.user.userId).get()
        }

    })
    .then((data) => {
        userData.events = [];
        data.forEach(doc => {
            userData.events.push(doc.data());
        }) 
         return db.collection('roster').where("userId", "==", req.user.userId).get()
    })
    .then((data) => {
        userData.currentlyTagged = []
        data.forEach((doc) => {
            userData.currentlyTagged.push({
                eventId: doc.data().eventId
            })
        })
        return res.json(userData);
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({ message: err.code})
    })
}

// another user details

exports.anotherUserDetails = (req, res) => {
    db.doc(`users/${req.params.email}`).get()
    .then((data) => {
        console.log(data.exists)
        if (!data.exists){
            return res.status(404).json({message: "user not found"});
        } else {
            return res.json(data.data());
        }
  
    })
    .catch((err) => {
        console.log(err)
        return res.status(500).json({ error: err.code})
    })

}