const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://192.168.2.67:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;


/*db.sequelize.sync();
//force: true will drop the table if it already exists
//db.sequelize.sync({force: true}).then(() => {
db.sequelize.sync({force: false, alter: true }).then(() => {
    console.log('Drop and Resync Database with { force: true }');
    //initial();
});*/

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Ump Community." });
});

// routes
require('./app/routes/auth.routes')(app);
//require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/*function initial() {
  Role.create({
    name: "user"
  });
 
  Role.create({
    name: "moderator"
  });
 
  Role.create({
    name: "admin"
  });
}*/