const { validationResult } = require('express-validator/check');
const mongoose = require('mongoose');

const User = require('../models/user');

exports.getUsers = ((req,res,next) =>{
    User.find({}, function (err, users) {
        res.send(users);
    });
});

exports.updateUser = ((req,res,next) => {

    User.findById(req.user.id, function (err, user) {
    
           
              //Finding user
            if (!user) {
                req.flash('error', 'No account found');
            }
    
            // Checking body
            var username = req.body.username.trim();
            var firstname = req.body.firstname.trim();
            var lastname = req.body.lastname.trim();
    
            // validate 
            if (!username || !firstname || !lastname) { 
                req.flash('error', 'One or more fields are empty');
                return res.redirect('/edit'); // modified
            }

            user.first_name = firstname;
            user.last_name = lastname;
            user.username = username;
            user.save(function (err) {
    
              if(err){
                  throw err;
              }
            });
        });
    });

    exports.deleteUser = ((req,res,next)=>{
      
        User.finByIdAndRemove({
            _id: req.params.id
          }, function (err, user) {
            if (err)
              return console.error(err);

            console.log('User successfully removed from collection!');
            res.status(200).send();


          });
    });