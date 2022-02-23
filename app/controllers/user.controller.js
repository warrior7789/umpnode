
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Spinner_parts = db.spinner_parts;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.allparts = (req, res) => {
    Spinner_parts.findAll({      
    }).then(result => {
        console.log(result);
        res.status(200).send(result);      
    })
};

exports.allpartsFront = (req, res) => {
    Spinner_parts.findAll({      
    }).then(result => {

        var gapArr = [{'fillStyle' : '#EF242C', 'text' : 'Better luck/nNext time', 'fontsize' : 20, 'textFillStyle' : '#ffffff', 'position' : '', 'isWin' : 'No'}, {'fillStyle' : '#D98B3C', 'text' : 'Better luck/nNext time', 'fontsize' : 20, 'textFillStyle' : '#ffffff', 'position' : '', 'isWin' : 'No'}, {'fillStyle' : '#128A9D', 'text' : 'Better luck/nNext time', 'fontsize' : 20, 'textFillStyle' : '#ffffff', 'position' : '', 'isWin' : 'No'}, {'fillStyle' : '#48C02C', 'text' : 'Better luck/nNext time', 'fontsize' : 20, 'textFillStyle' : '#ffffff', 'position' : '', 'isWin' : 'No'}, {'fillStyle' : '#95189D', 'text' : 'Better luck/nNext time', 'fontsize' : 20, 'textFillStyle' : '#ffffff', 'position' : '', 'isWin' : 'No'}];

        var combinedArray = [];
            
        for (let i = 0; i < result.length; i++)  {
            combinedArray.push(result[i]);
            if(result[i].gap > 0){
                for (let j = 0; j < result[i].gap; j++)  {
                    console.log('Result Gap : '+result[i].gap);
                    combinedArray.push(gapArr[j]);
                }
            }
        }
        
        res.status(200).send(combinedArray);      
    })
};

exports.DeleteParts = (req, res) => {    
   
    return Spinner_parts.destroy({ 
        where: {
            id: req.params.id
        }
    }).then(result => {
        console.log(result);
        res.status(200).send("Delete Sucessfully...");      
    })
};

exports.SelectParticularParts = (req, res) => {
    Spinner_parts.findOne({
        where: {
            id: req.params.id
        }
    }).then(result => {
        console.log(result);
        res.status(200).send(result);      
    })
};