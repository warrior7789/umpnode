const express = require("express");
var bodyParser = require('body-parser')
var multipart = require('connect-multiparty');
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
//app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use( multipart() );

// simple route

const db = require("./app/models");
const Role = db.role;
/*db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});*/

//db.sequelize.sync();

app.post("/body", function (req, res) {
    console.log(req.body)
    console.log(req.files)
    res.status(200).send({
      'message' : "heelo "
    });
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application https://www.bezkoder.com/node-js-jwt-authentication-mysql/" });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}