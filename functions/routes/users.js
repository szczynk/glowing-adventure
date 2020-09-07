const controller = require("../controllers/users");
const { isAuthenticated } = require("../middle/authenticated");
const { isAuthorized } = require("../middle/authenticated");


module.exports = (app) => {
    app.post(
        '/register',
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'recruiter', 'users'] }),
        controller.register
    );
}