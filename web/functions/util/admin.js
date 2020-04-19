/*
    1. Bringing in admin
    2. Service account only the once who have this key 
        have access to database and the cloud
    3.config our API KEY 
    4. FireBase FiRRRRRRRRRRRRE
*/

const admin = require("firebase-admin");
const config = require("./config");
const firebase = require("firebase");
const serviceAccount = require("./pickup-proj-firebase-adminsdk-tb36d-faf6e605d5.json");

/*
    Intializing our app and admin for the first time
*/

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `${config.databaseURL}`,
  storageBucket: `${config.storageBucket}`,
});

firebase.initializeApp(config);
/*
  This is our Database
*/

const db = admin.firestore();

module.exports = { admin, db };
