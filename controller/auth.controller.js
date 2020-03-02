const authService = require( '../services/auth.service' );
const emailValidator = require( '../utils/validatiors/emailValidator' );
const passwordValidator = require( '../utils/validatiors/passwordValidator' );
const generateOtp = require( '../helpers/generateOtp' );
const emptyCheck = require( '../utils/validatiors/emptyCheckValidator' );
exports.loginUser = async ( req, res ) => {
  try {
    const { email, password } = req.body;
    emailValidator.validate( email );
    let token = await authService.loginUser( { email, password } );
    res.status( token.code ).send( { message: token.message } );
  } catch ( err ) {
    let code = err.code ? error.code : 400;
    res.status( code ).json( { message: err.message } );
  }
}

exports.registerUser = async ( req, res ) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    emailValidator.validate( email );
    passwordValidator.validate( password );
    emptyCheck.validate( firstName, 'firstName' );
    emptyCheck.validate( lastName, 'lastName' );
    let otp = generateOtp();
    console.log(otp);
    
    let token = await authService.registerUser( { email, password, firstName, lastName, otp } );
    res.status( token.code ).send( { message: token.message } );
  } catch ( err ) {
    console.error( err.message );
    res.status( 500 ).json( { message: err.message } );
  }
}