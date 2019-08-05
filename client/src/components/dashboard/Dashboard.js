import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import Spinner from '../../components/layout/Spinner';

class Dashboard extends React.Component {

   
    componentDidMount(){
    
    }
    componentDidUpdate(prevProps){
       
    }


    render(){
        return (

            this.props.auth.loading ? <Spinner/>:
            

            (<Fragment>
                <div className='layoutgrid'>
                <Sidebar name={this.props.auth.user.name} />
                <div >
                    
                </div>


                </div>
               
            </Fragment>)
            
        )
    }
    
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth : state.auth
});

export default connect(mapStateToProps)(Dashboard);
