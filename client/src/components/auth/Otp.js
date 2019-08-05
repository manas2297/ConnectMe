import React , { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { verifyotp } from '../../actions/auth';
 
 
class Otp extends Component{

    constructor(){
        super();
        this.state= {
            otp:''
        }
    }

    redirect =()=>{
        console.log(`isAuhentiated: ${this.props.isAuthenticated}, isVerified: ${this.props.isVerified}`);
        if(this.props.isAuthenticated && !this.props.isVerified){
            this.props.history.push('/otp');
        }else if ( this.props.isAuthenticated && this.props.isVerified ){
            this.props.history.push('/dashboard');
        }
    }
    handleChange = (e) => {
        console.log(this.state.otp);
        console.log(this.props.userid);
        
        this.setState({[e.target.name]:e.target.value});
       
    }

    handleSubmit = ( e ) => {
        e.preventDefault();
        const otp = this.state.otp;
        const id = this.props.userid;
        console.log('otp page',id);
        
        this.props.verifyotp(id,otp);
    }

    componentDidMount(){
        this.redirect();
    }
    
    componentDidUpdate(prevProps){
        console.log(`isAuhentiated: ${this.props.isAuthenticated}, isVerified: ${this.props.isVerified}`);
        // console.log('Component u',this.props.isVerified,prevProps);
        
        console.log(`currentVer: ${this.props.isVerified}, prev: ${prevProps.isVerified}`);
        console.log(`currentA: ${this.props.isAuthenticated}, prev: ${prevProps.isAuthenticated}`);
        
        if((this.props.isVerified !== prevProps.isVerified) && this.props.isAuthenticated){
            this.redirect();
        }
    }

    render(){
        console.log(this.props.isVerified);
        // this.redirect();
        
        return(
            <Fragment>
                <h2 className="large text-primary" style={{textAlign:'center'}}>Enter Otp</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text"
                            placeholder="otp"
                            name="otp"
                            value={this.state.otp}
                            onChange = { this.handleChange }
                            required
                        />
                    </div>
                    <input type="submit" value="Submit" className="btn btn-primary" />
                </form>
            </Fragment>            
        )
    }
}

const mapStateToProps = (state) => ({
    userid : state.auth.user.userid,
    isAuthenticated : state.auth.isAuthenticated,
    isVerified : state.auth.isVerified
})

export default connect(mapStateToProps,{verifyotp})(Otp);