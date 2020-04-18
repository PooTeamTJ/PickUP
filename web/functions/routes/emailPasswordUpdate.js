const firebase = require('firebase')
const auth = firebase.auth()
const {db, admin} = require('../util/admin')

exports.updateEmail = (req,res) => {
    const user = auth.currentUser;

    if (req.body.email == req.user.email){
        return res.status(400).json({ message: "This is your current email"})
    }

                user.updateEmail(`${req.body.email}`)
                .then(() => {
                            user.sendEmailVerification()
                            db.doc(`/users/${req.user.email}`).update({
                                email: req.body.email
                            })
                            .then(() => {
                                db.doc(`/users/${req.user.email}`).get()
                                .then((doc) => {
                                    if (doc.exists)
                                    {
                                        var data = doc.data()
                                        db.doc(`/users/${req.body.email}`).set(data)
                                        .then(() => {
                                            db.doc(`/users/${req.user.email}`).delete()
                                        })
                                    }
                                })
                                return res.status(200).json({ message: "Succesfully updated"})
                            })
                        })
                .catch(err => {
                    console.log(err)
                    if (err.code === "auth/email-already-in-use"){
                        return res.status(403).json({ message: "This is not your email buddy"})
                    }
                    return res.status(500).json({message: err.code})
                })
            
}

/*
    Update Password
*/

exports.updatePassword = (req, res) => {
    const user = auth.currentUser

    auth.sendPasswordResetEmail(`${req.user.email}`)
        .then(() => {
            return res.status(200).json({ message: "Password reset email has been sent"})
        })
        .catch((err) => {
            return res.status(500).json({ message:err.code })
        })
}