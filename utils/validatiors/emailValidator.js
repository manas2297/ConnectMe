/**
 * @Description : Email Validator
 * @Author : Manas Yadav
 */

exports.validate = ( email, fieldName = 'email' ) => {
    if ( email === null ) {
        throw Error( `${ fieldName } cannot be empty` )
    }
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if ( !regexEmail.test( String( email ).toLowerCase() ) ) {
        throw Error( `Invalid ${ fieldName } address` )
    }
}