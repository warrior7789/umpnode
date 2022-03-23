const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var fs = require('fs');
const helper = require('../helper/helper');
var target_path = './public/avatar/';
const responce = require('../lib/responce');

exports.signup = (req, res) => {
    console.log(req.body, req.files);
    var unix = Math.round(+new Date()/1000);
    console.log(unix);
    
    if(helper.isEmpty(req.files)){
        res.status(200).send({
            message: 'Avatar required.'
        });
    }
    var tmp_path = req.files.avatar.path;
    var type = req.files.avatar.type;
    var name = unix+req.files.avatar.name;
    target_path = target_path + name;
    
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            //res.send('File uploaded to: ' + target_path);
        });
    });
    // Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        avatar: name,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
        if (!helper.isEmpty(req.body.roles)) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    responce.sendResponse(res,{},"User was registered successfully!")
                });
            });
        } else {
            // user role = 1
            user.setRoles([1]).then(() => {
                responce.sendResponse(res,{},"User was registered successfully!")                    
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message,
            status:0
        });
    });
};
exports.signin = (req, res) => {
    User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User Not found.",
                    staus:0
                });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            var token = jwt.sign({
                id: user.id
            }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};