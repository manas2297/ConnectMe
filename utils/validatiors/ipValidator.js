/*  
    @Description : IPv4 validator
    @Author      : Manas Yadav ---- 2020
*/

const validator = require( 'validator' )

exports.validate = ( ip, fieldName = 'ip' ) => {
    if ( ip === null ) {
        throw Error( `${ ip } cannot be empty` )
    }
    const regexIpv4 = /(([0-1]?[0-9]{1,2}\.)|(2[0-4][0-9]\.)|(25[0-5]\.)){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))/
    if ( !regexIpv4.test( ip ) ) {
        throw Error( `Invalid IP address` )
    }
}
