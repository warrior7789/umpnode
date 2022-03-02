const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const validationMiddleware = require('../middleware/validation-middleware');

const multer = require('multer');
const path = require("path");
//const upload = multer({dest:DIR}).single("avatar");
//const SpinnControlers = require("../controllers/spinn.controller");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, DIR);
    },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const maxSize = 1 * 1024 * 1024; // for 1MB
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"
    ) { 
      // To accept the file pass `true`, like so:
      cb(null, true);
    } else {
      // To reject this file pass `false`, like so:
      cb(null, false);
      //return "Only .png, .jpg and .jpeg format allowed!";
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  limits: { fileSize: maxSize },
}).single('avatar');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });



 /* app.post("/api/registration_",[
    multipartMiddleware,
    verifySignUp.checkDuplicateEmail,
    validationMiddleware.signup, 
    upload,
  ],controller.signup);*/

  app.post('/api/registration',[verifySignUp.checkDuplicateEmail,validationMiddleware.signup],controller.signup);

/*  app.post("/api/registration", (req, res) => {
     upload(req, res, (err) => {
      if(err) {
        res.status(400).send("Something went wrong!");
      }
      res.send(req.file);
    });
  });*/

  app.post("/api/login",controller.signin);
  /*app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/addParts", controller.addParts);
  app.post("/api/auth/updateparts", controller.updateparts);
  app.post("/api/checknumber", SpinnControlers.findnumber);
  app.post("/api/spinresult", SpinnControlers.insertnumber);
  app.post("/api/userinformation", SpinnControlers.userinformation);*/

};
