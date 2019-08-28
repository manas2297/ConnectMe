import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../../components/layout/Spinner';
import './Dashboard.css';

class Dashboard extends React.Component {

   constructor(){
       super();
       this.state = {
           isLoading: true,
           isAuth : false
       }
   }

    componentWillReceiveProps(nextProps){
        this.setState({
            isLoading : nextProps.profile.loading,
            isAuth : nextProps.auth.loading
        })
    }
    componentDidMount(){
        this.props.getCurrentProfile();
        
    
    }

    render(){
        return (

            <div className="main-content">
                {
                    !this.state.isAuth && this.state.isLoading ? <Spinner/>:<Fragment>
                        <div className="header">
                            <h1 className='large text-primary'>Dashboard</h1>
                            <p className='lead'>
                                { this.props.auth.user.name }
                            </p>
                        </div>
                        
                        <div className="content">
                            <div className='post theme'>
                                <input type="text" name='post' placeholder='Add post'/>
                                <button>Add</button>
                            </div>
                        </div>
                    </Fragment>
                }
                  

            </div>

          
            


            
        )
    }
    
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    auth : state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
