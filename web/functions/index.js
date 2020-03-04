// This is where our endpoints go
const functions = require("firebase-functions");

// firebase functions docs
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.test = functions.https.onRequest((request, response) => {
  response.send("Testing...");
});
