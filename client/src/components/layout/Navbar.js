import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth'

class Navbar extends React.Component {
    
    authLinks(){
        return(
            <ul>
                <li><Link to='/dashboard'>DashBoard</Link></li>
                
                <li><a href="#!" onClick={this.props.logout}>
                    <i className="fa fa-sign-out"></i>
                    <span className='hide-sm'> Logout</span>
                    </a>
                </li>
                
            </ul>
        )

    }

    guestLinks(){
        return(
            <ul>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        )
            
    }

    render(){
        return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"> <i className="fa fa-code"></i> ConnectMe </Link>
            </h1>
            {(!this.props.auth.loading && this.props.auth.isAuthenticated)?this.authLinks():this.guestLinks()}
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