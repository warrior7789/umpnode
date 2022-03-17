const {
    verifySignUp
} = require("../middleware");
const controller = require("../controllers/auth.controller");
var multipart = require('connect-multiparty');
//const DIR = './imagesPath/';
const DIR = './public/avatar/';

var multipartMiddleware = multipart({ uploadDir: DIR });

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/auth/signup",
        [    
            multipartMiddleware,
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );
    app.post("/api/auth/signin", controller.signin);
};