const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route GET api/auth
//@desc  Return logged in User Data
//@access Public

router.get('/', auth , async (req, res) => {
    try{
        const user = await User.findOne({
            where: {
                userid:req.user.id
            },
            attributes: {exclude: ['password','userid']}
        });
        res.json(user);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');   
    }
});

//@route POST api/auth
// Authenticate and get token


router.post('/',[
    check('email','Please include valid Email')
    .isEmail(),
    check('password','Password is required')
    .isLength({min:8})
], async ( req, res ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({
            errors: errors.array()
        });
    }
    const { email, password } = req.body;

    try{
        let user = await User.findOne({
            where: {
                email
            }
        });
        if(!user){
            return res.status(400)
            .json({ errors : [{ msg: 'Invalid Credentials ' }] })
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({errors:    [  {
                    msg: 'Invalid Credentials'
                 }
                ]
            });
        }

        const payload = {
            id: user.userid
        }
        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if(err) throw err;
                res.json({ token })
            }
        );
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
} 
)

module.exports = router;

