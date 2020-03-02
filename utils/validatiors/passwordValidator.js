/* 
   @Description : Service to validate password 
   @Author      : Manas Yadav 2020
*/
const validator = require( 'validator' )

exports.validate = ( password, fieldName = 'password' ) => {
    if ( password === null || validator.isEmpty( password ) ) {
        throw Error( `${ fieldName } can not be empty` )
    } else if ( validator.matches( password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/ ) === false ) {
        throw Error( `${ fieldName } must contain at least 8 characters, one number, one lowercase letter, one uppercase letter and one special character` )
    }
}