const {db} = require('../util/admin')
const firebase = require('firebase')
const auth = firebase.auth();
const config  = require('../util/config')

exports.signUp = (req,res) => {
    /*
        We get the new user data from the 
        body of the request we sent
    */
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }
    let userId;
    const defaultImg = 'defaultImg.png'
/*
    We want to have few checkpoint here to see
    if the user is sending the right Data.

    If the user sends bad data we want to return
    an error message
*/

if (newUser.password !== newUser.confirmPassword){
    return res.status(400).json({ message: "Passwords does not match. Please Check Again:)"})
}

else if (newUser.password.trim().length < 6){
    return res.status(400).json({ message: "Cannot have a password less than six characters :("})
}

/*
    Now we are going to try to create a new user
    Before we create a new user we need to check 
    if the user already exists by checking his email
*/
db.doc(`/users/${newUser.email}`).get()
    .then(doc => {
        if (doc.exists) {
            return res.status(400).json({ message: "Email has been already taken"})
        }
        else {
            return auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
                .then(data => {
                    data.user.sendEmailVerification()
                    userId = data.user.uid

                    const userCredentials = {
                        email: newUser.email,
                        createdAt: new Date().toISOString(),
                        userId: userId,
                        rating: 0.0,
                        age: 0,
                        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${defaultImg}?alt=media`
                    }
                    return db.doc(`/users/${newUser.email}`).set(userCredentials)
                        .then(data => {
                            return res.status(201).json({ message: "user signed up horray!"})
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    /*
                        Just an extra check
                    */
                   console.log(err);
                   if (err.code == "auth/email-already-in-use") {
                       return res.status(400).json({ message: "Email Already in Use"})
                   }

                   else {
                       return res.status(500).json({ message: err.code})
                   }

                })

        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ message: err.code})
    })

}

/*
    Login route
*/
exports.login = (req, res) => {
    const existingUser = {
        email: req.body.email,
        password: req.body.password
    }

    auth.signInWithEmailAndPassword(existingUser.email, existingUser.password)
        .then(data => {
            if (data.user.emailVerified)
                return data.user.getIdToken();
            else 
                return res.status(400).json({message: "please verify your email address"})
        })
        .then(token => {
            return res.json({token});
        })
        .catch(err => {
            console.log(err)

            if (err.code === "auth/wrong-password") return res.status(403).json({ message: 'Invalid Credentials'})

            else return res.status(500).json({ message: err.code})
        })
}


