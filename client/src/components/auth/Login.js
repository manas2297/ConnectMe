import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';


 

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            formData:{
                email:'',
                password:'',
            }
        }
    }
    handleChange = (e) => {
        this.setState({formData : {...this.state.formData,[e.target.name]:e.target.value}});
        console.log(this.state.formData.email);
    }
    handleSubmit =  (e) => {
        console.log(`Inside Handle Submit!`)
        e.preventDefault();
        const {email, password} = this.state.formData;
        this.props.login({email, password});
      
    }

    redirect =()=>{
        console.log(`isAuhentiated: ${this.props.isAuthenticated}`)
        if(this.props.isAuthenticated && !this.props.isVerified){
            console.log(`${this.props.isAuthenticated} and ${this.props.isVerified}`);
            this.props.history.push('/otp');
        }else if ( this.props.isAuthenticated && this.props.isVerified ){
            this.props.history.push('/dashboard');
        }
    }

    componentDidMount(){
        this.redirect();
    }
    componentDidUpdate(){
        this.redirect();
    }
    
    render(){
        
        return(
            
            <Fragment>
            <p className='text-primary' style={{textAlign:'center'}}><i className='large fa fa-user' />
            </p>
            <h1 className="large text-primary" style={{textAlign:'center'}} >Login</h1>
            <p className='lead' style={{textAlign:'center'}}>
                 Sign Into Your Account
            </p>
            <form className="form" onSubmit={this.handleSubmit}>
               
                <div className="form-group">
                    <input 
                    type="email" 
                    placeholder="abc@gmail.com" 
                    name='email' 
                    value={this.state.formData.email} 
                    onChange={this.handleChange} 
                    required  
                />
                </div>
                <div className="form-group">
                    <input 
                    type="password" 
                    name="password" 
                    minLength="8"
                    value={this.state.formData.password}
                    onChange={this.handleChange}
                    placeholder='Password'
                    />
                </div>
               
                <input type="submit" style={{width:"100%"}} value="Login" className="btn btn-primary" />
            </form>
            <p className="my-1" style={{textAlign:"center"}}>
                Want to create an account? <Link to="/register">SignUp</Link>
            </p>
        </Fragment>
        )
    }
    
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated : PropTypes.bool,
    isVerified: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated : state.auth.isAuthenticated,
    isVerified : state.auth.user.isVerified
});

export default connect(mapStateToProps,{ login })(Login);