import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Alert extends React.Component{
   
    render(){

        return(

                
            
                this.props.alerts !==null && this.props.alerts.length > 0 && this.props.alerts.map(alert => (
                    <p key={alert.id} className={`alert alert-${alert.alertType}`}>
                        {alert.msg}
                    </p>
                ))
            
           
        )
    }
}
Alert.propTypes = {
    alerts: PropTypes.array.isRequired, 
}
const mapStateToProps = state => ({
    alerts: state.alert
})
export default connect(mapStateToProps)(Alert);