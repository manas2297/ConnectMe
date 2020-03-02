/* @Description : Service to validate the phone number 
   @Author      : Manas Yadav 2020
*/
const validator = require('validator')

exports.validate = ( phoneNumber, fieldName = 'phoneNumber' ) => {
    
    if ( phoneNumber === null ) {
        throw Error( `${fieldName} cannot be empty` )
    }

    if ( validator.matches( phoneNumber, /^[0-9]{10,10}$/ ) == false ) {
        throw Error( `Invalid ${fieldName}` )
    }
}