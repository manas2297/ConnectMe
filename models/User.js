const Sequelize = require( 'sequelize' );
const sequelize = require( '../config/db' ).sequelize;
const Op = require( '../config/db' ).Op;
const bcrypt = require( 'bcrypt' );
const User = sequelize.define(
    'users',
    {
        userid: {
            type: Sequelize.UUIDV4,
            primaryKey: true
        },
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        otp: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        isVerified: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: false
        }
    }, {
    timestamps: false
} );
User.beforeCreate( async ( user ) => {
    try {
        if(!user.changed('password')){
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
    } catch(err) {
        throw new Error();
    }
    
} )
User.prototype.comparePassword = async function ( password ) {
    try {
        const isMatch = await bcrypt.compare( password, this.password );
        return isMatch;
    } catch ( err ) {
        return err;
    }
}
module.exports = User;