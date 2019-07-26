const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User  = require('../../Models/User');


//route POST api/users
//desc Register User


router.post('/', [

] , async (req, res) => {
    const { name, email, password } = req.body;

    try{
        let user = await User.create({
            name,
            email,
            password
        },{
            fields:["name","email", "password"]
        });

        if(user){
            res.json({
                data: user
            })
        }
        
       

    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}); 

module.exports = router;