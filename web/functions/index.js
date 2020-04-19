// This is where our endpoints go
const functions = require("firebase-functions");
const express = require("express");
const {db} = require('./util/admin')
const { signUp, login} = require('./routes/user')
const {addNewEvent, getAllEvents, getOneEvent, deleteEvent} = require('./routes/events')
const { eventTag, unEventTag} = require('./routes/tags')
const {uploadImage} = require('./routes/imgUpload')
const { editUserDetails, getUserDetails, anotherUserDetails} = require ('./routes/userDetails')
const {updateEmail, updatePassword} = require('./routes/emailPasswordUpdate')
const {addRating} = require('./routes/reviewRating')
const auth = require('./middleware/auth')
const cors = require('cors')







const app = express();
app.options("*", cors())


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

app.post('/user', auth, editUserDetails);
app.get('/user', auth, getUserDetails);
app.get('/user/:email', auth, anotherUserDetails);

app.post('/user/updateEmail', auth, updateEmail);
app.patch('/user/updatePassword', auth, updatePassword);


app.post('/events', auth, addNewEvent);
app.get('/events', auth, getAllEvents);
app.get('/events/:eventId', auth, getOneEvent);
app.delete('/events/:eventId', auth, deleteEvent)

app.get('/events/:eventId/tag', auth, eventTag)
app.get('/events/:eventId/untag', auth, unEventTag)

app.post('/rating/:email', auth, addRating)
// app.post('/rating/:ratingId', auth, editRating)
// app.delete('/rating/:ratingId', auth, deleteRating)

// ensure that our enpoints look like this no matter the route -> https://domain.com/api/
exports.api = functions.https.onRequest(app);
