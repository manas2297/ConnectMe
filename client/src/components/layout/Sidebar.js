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
                   
                    <Link to="/friends"><i className="fa fa-users"></i> Friend List</Link>
                    <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
                    <Link to='/profile/display'><i className="fa fa-code"></i> View Profile</Link>
                    <Link to='/profile/experience'> <i className="fa fa-black-tie"></i>  Add Experience </Link>
                    <Link to='/profile/education'><i className="fa fa-graduation-cap"></i> Add Education </Link>
                    <Link to='/profile/create'> <i className="fa fa-user-circle text-success"></i> Create Profile</Link>
                    

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