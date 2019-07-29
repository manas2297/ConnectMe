const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const uuid = require('uuidv4');

//@desc Display profile of logged in user
router.get('/me',auth, async ( req, res ) => {
    try{
        const profile = await Profile.findOne({where:{userUserid: req.user.id}});
        if(!profile){
            return res.status(400).json({msg: 'Generate the profile first'});
        }
        res.json(profile);  

    }catch(err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

//@route    POST api/profile
//@desc     Create/Update user profile
//@access   Private


router.post('/',[auth,[
    check('status','Status is required').not().isEmpty(),
    check('skills','Skills is required').not().isEmpty()
]], async ( req, res ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array() });
    }
    const {
        mobile_no,
        company,
        website,
        location,
        dob,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        instagram,
        linkedin,
    } = req.body;

    //Build profile object
    const profileFields = {};
    
    profileFields.userUserid = req.user.id;
    if(status) profileFields.status = status;
    if(skills) {
        profileFields.skills = skills;
    }
    if(mobile_no) profileFields.mobile_no = mobile_no;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(dob) profileFields.dob = dob;
    if(bio) profileFields.bio = bio;
    if(githubusername) profileFields.githubusername = githubusername;
    if(youtube) profileFields.youtube = youtube;
    if(instagram) profileFields.instagram = instagram;
    if(linkedin) profileFields.linkedin = linkedin;
    if(facebook) profileFields.facebook = facebook;

    try{
        let profile = await Profile.findOne({where:{userUserid: req.user.id}});
        // await console.log(profile);
        
        if(profile){
            //Update
            console.log('hello');
            
            await profile.update(
                profileFields
            ,
            {
                where: {
                    userUserid: req.user.id
                }
            }
            );
            console.log('this');
            
            return  res.json(profile);
        }
        
        //Create
        console.log('ok');
        profileFields.profiles_id = uuid();
        
        profile = await Profile.build(profileFields);
        await profile.save();
        res.json(profile);

    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
        
    }

}

)

module.exports= router;