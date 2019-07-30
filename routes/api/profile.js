const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const uuid = require('uuidv4');
const User = require('../../models/User');
const Education = require('../../models/Education');
const Experience = require('../../models/Experience');

//@desc Display profile of logged in user
router.get('/me',auth, async ( req, res ) => {
    try{
        const profile = await Profile.findOne({where:{userUserid: req.user.id},
            include: [
                {
                    model:Education,
                    attributes: ['school','degree','fieldofstudy','from','to','current','description']
                },
                {
                    model: Experience
                }
            ]
        });
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

});

//@route    GET api/profile/listAll
//@desc     List All profiles
//@access   Public

router.get('/listAll', async ( req, res ) => {
    try{

        let profiles = await Profile.findAll( {include:[{model:User, as:'user', attributes:['name','email']},{model:Education,attributes: ['school','degree','fieldofstudy','from','to','current','description']}]});
        res.json(profiles);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET api/profile/user/:userid
//@desc     Get Profile by userid
//@access   Public

router.get('/user/:userid', async ( req, res ) => {
    try{

        let profile = await Profile.findOne( {where:{userUserid: req.params.userid},include:[{model:User, as:'user', attributes:['name','email']},{model:Education,attributes: ['school','degree','fieldofstudy','from','to','current','description']}]});
        if(!profile){
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.json(profile);
    }catch(err){
        console.error(err.message);
        // if(err.kind == 'uuid'){
        //     return res.status(400).json({msg: 'Profile not found'});
        // }
        res.status(500).send('Server Error');
    }
});

//@route    DELETE api/profile
//@desc     Delete profile, user & post
//@access   Private

router.delete('/',auth, async ( req, res ) => {
    try{

        //Remove Profile
        let profile = await Profile.findOne({where:{userUserid: req.user.id}});
        let edu = await Education.findOne({where:{profileProfilesId:profile.profiles_id}});
        let user  = await User.findOne({where:{userid:req.user.id}});
        
        await edu.destroy({froce:true});
        await profile.destroy({force:true});
        await user.destroy({force:true});
        res.json({msg:'User removed'});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    Post api/profile/education
//@desc     Create user education
//@access   Private

router.post('/education', 
    [ 
        auth, 
        [
            check('school', 'Enter your school')
                .not()
                .isEmpty(),
            check('degree','Degree details are required')
                .not()
                .isEmpty(),
            check('fieldofstudy', 'Enter field of study')
                .not()
                .isEmpty(),
            check('from','From is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
           school,
           degree,
           fieldofstudy,
           from,
           to,
           current,
           description
        } = req.body;
        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
         }; 
         

         try{
            let userProfile = await Profile.findOne({
                where: {
                    userUserid: req.user.id
                },
            });
            newEdu.profileProfilesId = userProfile.profiles_id;
            let edu = await Education.findOne({
                where: {
                    profileProfilesId: userProfile.profiles_id
                }
            });
            if(edu){
                console.log('hello');
                
                await userProfile.update({
                    newEdu
                });
                return res.json(userProfile);
            }

            edu = await Education.build(newEdu);
            await edu.save();
            res.json(edu);

         }catch(err){
             console.error(err.message);
             res.status(500).send('Server Error');
         }

    }   
 );
 //@route    Post api/profile/experience
//@desc     Create user experience
//@access   Private
router.post('/experience', [
    auth,
    [
        check('title','Title is required')
        .not()
        .isEmpty(),
        check('company','Comapny is required')
        .not()
        .isEmpty()
    ]   
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try{
        let profile = await Profile.findOne({where:{userUserid:req.user.id}});
    newExp.profileProfilesId = profile.profiles_id;
    let exp = await Experience.build(newExp);
    await exp.save();
    res.json(exp);
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }  
} );

//@desc To edit an experience using the exp_id
router.post('/experience/edit/:exp_id',[
    auth,
    [
        check('title','Title is required')
        .not()
        .isEmpty(),
        check('company','Company is required')
        .not()
        .isEmpty()
    ]
], async ( req, res ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
    try{

        let exp = await Experience.findOne({where:{id:req.params.exp_id}});
        if(!exp){
            return res.status(400).send('');
        }
        await exp.update(newExp);
        return res.json(exp);

    }catch(err){
        console.error(err.message);
        req.status(500).send('Server Error');
    }
});

//@desc To delete an experience by the id

router.delete('/experience/delete/:exp_id',auth, async (req, res) => {

    try{
        let exp = await Experience.findOne({where:{id:req.params.exp_id}});
        if(!exp){
            return res.status(400).json({msg:"Bad Request, Experience Does not exists!!"});
        }
        exp.destroy({force:true});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
    
});

module.exports= router;