var express = require('express');
var mongoose = require('mongoose');
const router = express.Router();
const User = mongoose.model("User")
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var requireLogin = require('../middleware/require');


// protected route
// router.get('/protected', requireLogin, (req,res) => {
//   res.send("hello user")
// })

// Sign Up routes
router.post('/signup',(req, res) => {
    // console.log( req.body.name);
    const {name, email, password } = req.body;
    if(!email || !password || !name){
        return  res.status(422).json({error: "please fill up the required fields"})
    }
    User.findOne({email:email}).then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error:"user already exist with that email"})
        }
        bcrypt.hash(password,12)
         .then(hasshedPassword => {

             const user = new User({
                 name, email, password:hasshedPassword
                })
                user.save().then(user => {
                    res.json({message:'saved succesfully'})
                })
                .catch(err => {
                    console.log(err)
                })
         })
    })
    .catch(err => {
        console.log(err)
    })
});

// login user
router.post('/signin',  (req, res) => {
    // console.log( req.body.name);
    const {email, password } = req.body;
    if(!email || !password){
        return  res.status(422).json({error: "please add email and password in the required fields"})
    }
    User.findOne({email:email}).then((savedUser) => {
        if(!savedUser){
            return res.status(422).json({error:"Invalid email and password"})
        }
        bcrypt.compare(password, savedUser.password)
         .then(match => {
            if(match){
            //   res.json({messsage: 'Successfully signin'})

            const token = jwt.sign({_id:savedUser._id }, 'thisisasecreat')
              const {_id, name, email} = savedUser;

              res.json({token, user:{_id, name, email}})
            } else {
                return res.status(422).json({error:"Invalid password"})
            }
        })
        .catch(err => {
            console.log(err)
        })

    })
    
});


module.exports = router;