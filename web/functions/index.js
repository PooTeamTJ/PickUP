// This is where our endpoints go
const functions = require("firebase-functions");
const express = require("express");
const {db} = require('./util/admin')
const { signUp, login} = require('./routes/user')
const {uploadImage} = require('./routes/imgUpload')
const auth = require('./middleware/auth')
const app = express();


// no need to pass any parameters beacause of .firebasesrc
// admin.initializeApp();

// firebase functions docs
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.test = functions.https.onRequest((request, response) => {
//   response.send("Testing...");
// });

app.post('/signup', signUp);
app.post('/login', login)

app.post('/user/imageUpload',auth, uploadImage)
// ensure that our enpoints look like this no matter the route -> https://domain.com/api/
exports.api = functions.https.onRequest(app);
