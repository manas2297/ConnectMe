const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuidv4');
const User  = require('../../models/User');
const config = require('config');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'manas@cronj.com',
        pass:'mmmut@1234'
    }
});



//route POST api/users
//desc Register User


router.post('/', [
    check('name','Name is required')
    .not()
    .isEmpty(),
    check('email', 'Enter valid email')
    .isEmail(),
    check('password','Please enter password with 8 or more characters')
    .isLength({min:8})
] , async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({
            errors: errors.array()
        });
    }
    function generateOTP() { 
          
        // Declare a digits variable  
        // which stores all digits 
        var digits = '123456789'; 
        let OTP = ''; 
        for (let i = 0; i < 4; i++ ) { 
            OTP += digits[Math.floor(Math.random() * 10)]; 
        } 
        return OTP; 
    } 

    const { name, email, password } = req.body;
    
    try{


        let otp = generateOTP();
        let user = await User.findOne({where:{email}});
        if(user){
            return res.status(400).json({
                errors: [{msg: 'User Already registered'}]
            });
        }

        user = await User.build({
            userid: uuid(),
            name,
            email,
            password,
            otp
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const mailOptions = {
            from: 'manas@cronj.com', // sender address
            to: email, // list of receivers
            subject: 'Verify your email', // Subject line
            html:  `Your OTP is ${otp}`// plain text body
          };
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
                console.log(err)
            else
                console.log(info);
        });


        const payload = {
            id : user.userid
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            ( err, token ) => {
                if(err) throw err;
                res.json({ token });
            }
        );
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}); 

module.exports = router;