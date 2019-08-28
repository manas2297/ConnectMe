import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import Create from './Create';
import Spinner from '../../components/layout/Spinner';
import profile from '../../reducers/profile';

class Display extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isloading: true
        }
    }
    componentWillReceiveProps(nextProps){
        // this.props.getCurrentProfile();
        this.setState({isloading:nextProps.profile.loading});
        
    }
     componentDidMount(){
        this.props.getCurrentProfile();
        // console.log(this.state.isloading);
        // this.setState({isloading:this.props.profile.loading});
        // console.log(this.props.profile);
    }
    render(){
        return (
            <div className="main-content">
                {
                    this.state.isloading ? <Spinner/>: <Fragment><h1>This is profile</h1></Fragment>
                }
            </div>
        )
    }
}
Create.propTypes = {
    getCurrentProfile : PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = (state) =>( {
    profile: state.profile
});
export default connect(mapStateToProps,{getCurrentProfile})(Display);