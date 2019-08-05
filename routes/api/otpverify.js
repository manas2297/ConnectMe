const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User  = require('../../models/User');
const config = require('config');
const auth = require('../../middleware/auth');

//route Post api/users/otp
//desc Verify Email
router.post('/:userid',[
    auth,
    [
    check('otp','Enter otp')
    .not()
    .isEmpty()
    ]
], async (req,res)=>{
    const errors = validationResult(req);
    // console.log('body',req.body);
    
    if(!errors.isEmpty()){
        return res.status(400).send({
            errors: errors.array()
        });
    }

    try{
        let user = await User.findOne({where:{userid:req.params.userid}});
        req.body.otp = parseInt(req.body.otp);
        console.log(typeof(req.body.otp),typeof(user.otp));

        
        if(user.otp === req.body.otp){
            await user.update({isVerified:true});
            res.json(user);
        }else{
            res.status(400).json({
                errors:[{msg:'Wrong OTP'}]
            })
        }
    

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;