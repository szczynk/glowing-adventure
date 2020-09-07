var functions = require('firebase-functions');
var admin = require('firebase-admin');
var express = require('express')
var cors = require('cors');


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

var serviceAccount = require("./config/test-1-8c2ac-firebase-adminsdk-soa86-a8c89de7da.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://test-1-8c2ac.firebaseio.com"
});

// const db = admin.firestore();

var app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.get('/hello-world', (req, res) => {
    return res.status(200).send('Hello World!');
});

// require('./routes/users')(app);

exports.api = functions.https.onRequest(app);