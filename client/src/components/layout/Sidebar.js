import React, { Fragment } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';

const history = createBrowserHistory();
class Sidebar extends React.Component {

    constructor(props){
        super(props);
    }

   
    render(){
        return (
            (this.props.auth.isAuthenticated && this.props.auth.isVerified)?(
        <Fragment>
             <div className='sidebar'>
                    <div className='profilePic' >
                        <i className="fa fa-user fa-3x "></i>
                    </div>
                    <span className="name_header">
                        <h4>{this.props.name}</h4>
                        <button className='btn btn-primary'>Profile</button>
                       
                    </span>
                   
                    <Link to="/friends">Friend List</Link>
                    <a href="#">Dashboard</a>
                    <Link to='/profile/display'>View Profile</Link>
                    <Link to='/profile/create'>Edit Profile</Link>
                    

                </div>
            
        </Fragment>):null
        )
    }
}

const mapStateToProps = (state) => ({
    auth : state.auth,
    profile: state.profile
});
export default connect(mapStateToProps)(Sidebar);