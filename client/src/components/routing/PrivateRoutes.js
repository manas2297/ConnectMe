import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

const  PrivateRoutes= ({ component: Component, auth : { isAuthenticated, isVerified, loading }, ...rest })=> (
    <Route {...rest} render= {props => 
        !isAuthenticated && !loading && !isVerified?(
            props.history.push('/login')
            ) : (
                <Component {...props} />
            )
        } 
    />

)

PrivateRoutes.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoutes);
