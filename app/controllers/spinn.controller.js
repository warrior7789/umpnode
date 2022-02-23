const db                = require("../models");
const config            = require("../config/auth.config");
var jwt                 = require("jsonwebtoken");
var bcrypt              = require("bcryptjs");
var nodeMailer          = require('nodemailer');

const SpinnerEnquiry    = db.SpinnerEnquiry;
const UserData          = db.UserInformation;
const Op                = db.Sequelize.Op;

// Spinner Insert 
exports.findnumber = (req, res) => {
    SpinnerEnquiry.findOne({ where: { number: req.body.number, createdAt: { [Op.lt]: new Date(), [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000) }}, order: [ ['id', 'DESC']] }).
      then(function(SEdata){
        if (SEdata) {             //exists...
            let data = {
              status: 0,
              message: 'you already spin. Please come after 24 hour',
            }
            res.send(data);
        } else {
            let data = {
              status: 1,
              message: 'you can spin now'
            }
            res.send(data);
        }
      });
};

exports.insertnumber = (req, res) => {
    SpinnerEnquiry.create({
      number: req.body.number,
      status: req.body.status,
      prize_win: req.body.prize_win,
      win_status: req.body.win_status
    })
    .then(result => {
      let data = {
              status: 1
            }
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.allenquiry = (req, res) => {
  //console.log(req);
    var pageSize                =   10
    var no_of_records_per_page  =   10
    var pageno                  =   req.body.search.page
    var winStatus               =   req.body.search.winStatus
    var searchNumber            =   req.body.search.searchNumber

    var whereStatement          = {};
    if(winStatus == 'Yes')
        whereStatement.win_status = winStatus;
    if(winStatus == 'No')
        whereStatement.win_status = winStatus;    
    if(searchNumber != '')
        whereStatement.number = {[Op.like]: '%' + searchNumber + '%'};
   
    var offset = (pageno-1) * no_of_records_per_page;
  
    const data = {
      total : 0,
      perpage : 10,
      result : "",
    };
    SpinnerEnquiry.findAndCountAll({
      order: [ ['id', 'DESC']],
      limit: no_of_records_per_page,
      offset: offset,
      where: whereStatement
    }).then(result => {
        console.log(result);

        data.total=result.count;       
        data.result=result.rows;
        res.status(200).send(data);      
    })     
};



exports.SelectEnquiry = (req, res) => {
  if(req.params.status == 'All'){
    SpinnerEnquiry.findAll({
      where: {
        status: 1
      },
      order: [ ['id', 'DESC']]
    }).then(result => {
        console.log(result);
        res.status(200).send(result);      
    })    
  } else {
    SpinnerEnquiry.findAll({
      where: {
        win_status: req.params.status
      },
      order: [ ['id', 'DESC']] 
    }).then(result => {
        console.log(result);
        res.status(200).send(result);      
    })
  }
};

exports.DeleteEnquiry = (req, res) => {    
   
    return SpinnerEnquiry.destroy({ 
        where: {
            id: req.params.id
        }
    }).then(result => {
        console.log(result);
        res.status(200).send("Delete Sucessfully...");      
    })
};

/*************** USER INFORMATION ************************************/

exports.alluser = (req, res) => {
    UserData.findAll({      
    }).then(result => {
        console.log(result);
        res.status(200).send(result);      
    })
};

exports.userinformation = (req, res) => {
    UserData.create({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      PhoneNumber: req.body.PhoneNumber,
      Website: req.body.Website,
      Description: req.body.Description,
      Address: req.body.Address,
      WinPrize: req.body.WinPrize
    })
    .then(result => {
      
      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: 'test2.raindropsinfotech@gmail.com',
            pass: 'lloydrain123'
          }
      });    
      
      let mailOptions = {
          from: '"raindropsinfotech" <raindropsinfotech.com>', // sender address
          to: 'jaysing@raindropsinfotech.com', // list of receivers
          subject: 'User Submit Information', // Subject line
          text: 'Text Body', // plain text body
          html: '<html><head><title>Win User Information</title></head><body><center><table cellpadding="10" cellspacing="1" style="width:800px; border:0px; background:#ccc;"><tr style="background: #b6dffe; color: #0d6cb6; font-size:20px; font-family:Arial, Helvetica, sans-serif;"><td align="center" colspan="2">New User Information Details</td></tr><tr style="background: #ffffff; color:#5a5a5a; font-size:15px; text-align:left; font-family:Arial, Helvetica, sans-serif; vertical-align:top;"><td style="width:300px;"><strong>First Name</strong></td><td style="width:300px;">'+req.body.FirstName+'</td></tr><tr style="background: #fcfbfb; color: #5a5a5a; font-size:15px; text-align:left; font-family:Arial, Helvetica, sans-serif; vertical-align:top;"><td style="width:300px;"><strong>Last Name</strong></td><td style="width:300px;">'+req.body.LastName+'</td></tr><tr style="background: #fcfbfb; color: #5a5a5a; font-size:15px; text-align:left; font-family:Arial, Helvetica, sans-serif; vertical-align:top;"><td style="width:300px;"><strong>Email</strong></td><td style="width:300px;">'+req.body.Email+'</td></tr><tr style="background: #fcfbfb; color: #5a5a5a; font-size:15px; text-align:left; font-family:Arial, Helvetica, sans-serif; vertical-align:top;"><td style="width:300px;"><strong>Phone Number</strong></td><td style="width:300px;">'+req.body.PhoneNumber+'</td></tr><tr style="background: #fcfbfb; color: #5a5a5a; font-size:15px; text-align:left; font-family:Arial, Helvetica, sans-serif; vertical-align:top;"><td style="width:300px;"><strong>Website</strong></td><td style="width:300px;">'+req.body.Website+'</td></tr><tr style="background: #fcfbfb; color: #5a5a5a; font-size:15px; text-align:left; font-family:Arial, Helvetica, sans-serif; vertical-align:top;"><td style="width:300px;"><strong>Business / Job Description</strong></td><td style="width:300px;">'+req.body.Description+'</td></tr><tr style="background: #fcfbfb; color: #5a5a5a; font-size:15px; text-align:left; font-family:Arial, Helvetica, sans-serif; vertical-align:top;"><td style="width:300px;"><strong>Address</strong></td><td style="width:300px;">'+req.body.Address+'</td></tr><tr style="background: #fcfbfb; color: #5a5a5a; font-size:15px; text-align:left; font-family:Arial, Helvetica, sans-serif; vertical-align:top;"><td style="width:300px;"><strong>Win Prize</strong></td><td style="width:300px;">'+req.body.WinPrize+'</td></tr></table></center></body></html>' // html body
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          //console.log('Message %s sent: %s', info.messageId, info.response);
          //res.render('index');

          let data = {
              status: 1,
              mailresponce: info.response
          }
        
          console.log(data);
          res.send(data);
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.DeleteUser = (req, res) => {    
   
    return UserData.destroy({ 
        where: {
            id: req.params.id
        }
    }).then(result => {
        console.log(result);
        res.status(200).send("Delete Sucessfully...");      
    })
};

/*************** USER INFORMATION ************************************/