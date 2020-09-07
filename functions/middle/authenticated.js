var admin = require('firebase-admin');

exports.isAuthenticated = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization)
        return res.status(401).send({ message: 'Unauthorized' });
 
    if (!authorization.startsWith('Bearer'))
        return res.status(401).send({ message: 'Unauthorized' });
 
    const split = authorization.split('Bearer ')
    if (split.length !== 2)
        return res.status(401).send({ message: 'Unauthorized' });
 
    const token = split[1]
 
    try {
        await admin.auth().verifyIdToken(token)
            .then((decodedToken) => {
                console.log("decodedToken", JSON.stringify(decodedToken))
                if(decodedToken.uid === user.uid) {
                    req.user = user.uid
                    return next()
                }
            })
            .catch (error) {
                console.log(error);
                return res.status(401).send(error);
            };
    }
    catch (error) {
        console.log(error);
        return res.status(401).send(error);
    }
}