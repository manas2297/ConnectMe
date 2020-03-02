const authService = require( '../services/auth.service' );
const emailValidator = require( '../utils/validatiors/emailValidator' );
const passwordValidator = require( '../utils/validatiors/passwordValidator' );

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

exports.registerUser = ( req, res ) => {
  res.status( 200 ).send( 'hello' );
}