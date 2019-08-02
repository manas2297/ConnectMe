import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth'

class Navbar extends React.Component {

    render(){
        return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"> <i className="fa fa-code"></i> ConnectMe </Link>
            </h1>
            <ul>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    )
    }
    
}

Navbar.propTypes = {
    logout : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,

})

export default connect(mapStateToProps,{logout})(Navbar);