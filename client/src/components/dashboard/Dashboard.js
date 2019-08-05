import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../../components/layout/Spinner';

class Dashboard extends React.Component {

   
    componentDidMount(){
        this.props.getCurrentProfile();
    
    }
    componentDidUpdate(prevProps){
       
    }


    render(){
        return (

            this.props.auth.loading && this.props.profile ? <Spinner/>:null
            


            
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
