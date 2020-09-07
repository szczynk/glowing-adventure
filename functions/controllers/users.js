const db = admin.firestore();
var admin = require('firebase-admin');

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body

        if (!firstName || !lastName || !email || !password || !role) {
            return res.status(400).send({ message: 'Missing fields' })
        }

        const { uid } = await admin.auth().createUser({
            firstName,
            lastName,
            email,
            password
        })

        await admin.auth().setCustomUserClaims(uid, { role })

        return res.status(200).send({ uid })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

exports.login = async (req, res) => {
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(() => {
        firebase.auth().currentUser.getIdToken(true)
        .then((token) => {
            return res.status(200).send(token)
            // res.end()
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).send(error);
        })
    })
    .catch((error) => {
        console.log(error);
        return res.status(500).send(error);
    })
}