import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(){
        super();
        this.state ={
            formData:{
                email:'',
                password:'',
            }
        }
    }
    handleChange = (e) => {
        this.setState({formData : {...this.state.formData,[e.target.name]:e.target.value}});
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.formData);
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

export default Login;