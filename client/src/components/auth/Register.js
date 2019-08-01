import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            formData:{
                name:'',
                email:'',
                password:'',
                password2:''
            }
        }
    }
    
    handleChange = (e) => {
        this.setState({formData : {...this.state.formData,[e.target.name]:e.target.value}});
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.formData.password !== this.state.formData.password2){
            this.props.setAlert('Passwords do not match', 'danger');
            
        } else {
            const {name,email,password} = this.state.formData;
            this.props.register({name, email, password});
        }
    }
    
    
    render(){
        return(
            
            <Fragment>
                <p className='text-primary' style={{textAlign:'center'}}><i className='large fa fa-user' />
                </p>
                <h1 className="large text-primary" style={{textAlign:'center'}} >Sign Up</h1>
                <p className='lead' style={{textAlign:'center'}}>
                     Create Your Account
                </p>
                <form className="form" onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <input 
                        type="text"
                        placeholder='name'
                        name='name'
                        value={this.state.formData.name}
                        onChange={this.handleChange}             
                    />
                    </div>
                    <div className="form-group">
                        <input 
                        type="email" 
                        placeholder="abc@gmail.com" 
                        name='email' 
                        value={this.state.formData.email} 
                        onChange={this.handleChange} 
                    />
                    </div>
                    <div className="form-group">
                        <input 
                        type="password" 
                        name="password" 
                        value={this.state.formData.password}
                        onChange={this.handleChange}
                        placeholder='Password'
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="password" 
                        name="password2" 
                       
                        value={this.state.formData.password2}
                        onChange={this.handleChange}
                        placeholder='Confirm Password'
                        />
                    </div>
                    <div className="form-group">
                    <input type="submit" value="Register" style={{width:"100%"}} className="btn center btn-primary" />
                    </div>
                    
                </form>
                <p className="my-1" style={{textAlign:"center"}}>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </Fragment>
        )
    }
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired 
}
export default connect(null, { setAlert, register })(Register);