const db = require("../models");
const User = db.user;

checkDuplicateEmail = (req,res,next) =>{  
    User.findOne({
        where:{
            email: req.body.email
        }
    }).then(user =>{
        if(user){
             console.log(user)
            res.status(400).send({
                message : "Eamil is already Exist"
            });
            return;
        }else {
            next();
        }
    })
}



const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail
};

module.exports = verifySignUp;