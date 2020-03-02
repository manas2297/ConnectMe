/* 
 *  @Description : Service to check empty field 
 *  @Author      : Manas Yadav ---- 2020
*/
const validator = require( 'validator' )

exports.validate = ( key, fieldName ) => {
    console.log( key, fieldName );

    if ( key === null || validator.isEmpty( key ) ) {
        throw Error( `${ fieldName } can not be empty` )
    }
}