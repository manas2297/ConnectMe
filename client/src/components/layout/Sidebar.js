import React, { Fragment } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';


class Sidebar extends React.Component {
    render(){
        return (
        <Fragment>
             <div className='sidebar'>
                    <div className='profilePic' >
                        <i className="fa fa-user fa-3x "></i>
                    </div>
                    <span className="name_header">
                        <h4>{this.props.name}</h4>
                        <button className='btn btn-primary'>Profile</button>
                        <button className='btn btn-primary'>Edit</button>
                    </span>
                   
                    <Link to="/friends">Friend List</Link>
                    <a href="#">Dashboard</a>
                    <a href="#">View Profile</a>
                    

                </div>
            
        </Fragment>
        )
    }
}

export default Sidebar;