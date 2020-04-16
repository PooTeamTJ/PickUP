const {db, admin} = require('../util/admin')
const firebase = require('firebase')
const auth = firebase.auth()

/*
    Give Rating to someone
*/

exports.addRating = (req, res) => {

    if (req.body.rating <= 0 || req.body.rating > 5){
        return res.status(400).json({ message : "Rating has to be between 1 to 5"})
    }

    if (req.user.email == req.params.email){
        return res.status(400).json({ message : "You cannot rate yourself"})
    }

    const newRating = {
        rating: req.body.rating,
        review: req.body.review,
        createdAt: new Date().toISOString(),
        reviewer: req.user.email,
        reviewed: req.params.email
    }
    let updaterating = {}
    db.doc(`/users/${req.params.email}`).get()
        .then((data) => {


            if (data.exists){
                db.collection('ratings').add({newRating})
                .then((doc) => {
                            if(data.data().rating == -1){
                                updaterating.rating = newRating.rating
                            }
                            else {
                                updaterating.rating = (data.data().rating + newRating.rating)/2 
                            }
                            return db.doc(`/users/${req.params.email}`).update({
                                rating: updaterating.rating
                            })
                            .then(() => {
                                return res.status(200).json({message: "rating has been submitter"})
   
                            })
                            .catch(err => {
                                console.log(err)
                                return res.status(500).json({ message: err.code})
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            return res.status(500).json({ message: err.code})
                        })
        
            }
            else {
                return res.status(400).json({ message: "user not found"})
            }

        })
}

