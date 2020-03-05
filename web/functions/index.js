// This is where our endpoints go
const functions = require("firebase-functions");
const admin = require("firebase-admin"); // the admin sdk
const express = require("express");
const app = express();

// no need to pass any parameters beacause of .firebasesrc
admin.initializeApp();

// firebase functions docs
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.test = functions.https.onRequest((request, response) => {
  response.send("Testing...");
});

// ensure that our enpoints look like this no matter the route -> https://domain.com/api/
exports.api = functions.https.onRequest(app);
