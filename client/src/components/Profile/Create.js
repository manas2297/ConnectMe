import React from 'react';
import PropTypes from 'prop-types';
// import { Link }  from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import Alert from '../layout/Alert';
// import Spinner from '../layout/Spinner'

const history = createBrowserHistory();

class Create extends React.Component {
    constructor(props){
        super(props);
        this.state = {

            formData: {
                mobile_no:null,
                company:'',
                website:'',
                location:'',
                dob:'',
                bio:'',
                status:'',
                githubusername:'',
                skills:'',
                youtube:'',
                facebook:'',
                instagram:'',
                linkedin:''
            }
            // school:'',
            // degree:'',
            // fieldofstudy:'',
            // from:'',
            // to:'',
            // current:'',
            // description:''
            ,
            displaySocial:false
        }
    }

    componentDidMount(){
        this.props.getCurrentProfile();
        alert('hello');

        this.setState({
            formData: {
                mobile_no: this.props.profile.loading || !this.state.formData.mobile_no ? '':this.props.profile.mobile_no
            }
        });
        console.log(this.props.profile,'mobile from props');
        console.log(this.state.formData.mobile_no,'Mobile number from state');

        

    }
    toggleSocial = () => { 

        let b = this.state.displaySocial;
        this.setState({displaySocial:!b});
    }

    onChangehandle = (e) => {
        this.setState({formData:{...this.state.formData, [e.target.name]:e.target.value}});
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.createProfile(this.state.formData,history);
    }
    componentDidUpdate(){
       
        // this.props.getCurrentProfile();
    }
    render(){
       
        // this.props.getCurrentProfile();
        const loading = this.props.profile.loading;
        console.log(loading);
        
        const {  
            mobile_no,
            company,
            website,
            location,
            dob,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            instagram,
        linkedin} = this.state.formData;
        return (
            <div className="main-content">



                <h1 className="large text-primary">
                    Create Profile
                </h1>
                <p className='lead'>
                    Let's get some information to make your profile.
                </p>
                <small className='text-danger'>* = required field</small>
                <Alert/>
                <form className="form" onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <select name="status" value={status} onChange={(e) => this.onChangehandle(e)}>
                            <option value="0"> * Select Profssional Status</option>
                            <option value="Developer">Developer</option>
                            <option value="Junior Developer">Junior Developer</option>
                            <option value="Senior Developer">Senior Developer</option>
                            <option value="Manager">Manager</option>
                            <option value="Student or Learning">Student or Learning</option>
                            <option value="Instructor or Teacher">Instructor or Teacher</option>
                            <option value="Intern">Intern</option>
                            <option value="Other">Other</option>
                        </select>
                        <small className='form-text'> Give us an idea of where you are at in your carrer</small>
                    </div>

                    <div className="form-group">
                        <input type="text" name="company" value={company} placeholder="Company" onChange={this.onChangehandle}/>
                        <small className='form-text' >Your Company or the one you work for</small>
                    </div>
                    <div className="form-group">
                        <input type="text" name="website" value={website} onChange={this.onChangehandle} placeholder="Website"/>
                        <small className='form-text'>Your company website</small>
                    </div>
                    <div className="form-group">
                        <input type="text" name="location" value={location} onChange={this.onChangehandle} placeholder="Location"/>
                        <small className='form-text'>City & State (eg. Varansi, UP)</small>
                    </div>
                    <div className="form-group">
                        <input type="text" name="skills" placeholder="* Skills" onChange={this.onChangehandle} value={skills}/>
                        <small className='form-text'>Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
                    </div>
                    <div className="form-group">
                        <input type="text" name="mobile_no" placeholder="Phone" onChange={this.onChangehandle} value={this.state.formData.mobile_no}/>
                        <small className='form-text'>Please enter your phone no.</small>
                    </div>

                    <div className="form-group">
                        <input type="text" name="githubusername" placeholder="Github Username" onChange={this.onChangehandle} value={githubusername} />
                        <small className='form-text'>Import your latest repos and Github link, include your username</small>
                    </div>
                    <div className="form-group">
                        <textarea name="bio" onChange={this.onChangehandle} value={bio} placeholder='A short bio'></textarea>
                        <small className='form-text'>Tell us a little about yourself</small>
                    </div>

                    <div className="my-2">
                        <button className="btn btn-success" type='button' onClick={this.toggleSocial}>
                            Add Social Network Links
                        </button>
                        <span>optional</span>
                    </div>
                    {
                        this.state.displaySocial?
                        <>
                            <div className="form-group social-input">
                                <i className="fa fa-youtube fa-2x"></i>
                                <input type="text" name="youtube" onChange={this.onChangehandle} value={youtube} placeholder="Youtube URL" />
                            </div>
                            <div className="form-group social-input">
                                <i className="fa fa-facebook fa-2x"></i>
                                <input type="text" name="facebook" onChange={this.onChangehandle} value={facebook} placeholder="Facebook URL" />
                            </div>
                            <div className="form-group social-input">
                                <i className="fa fa-instagram fa-2x"></i>
                                <input type="text" name="instagram" onChange={this.onChangehandle} value={instagram} placeholder="Instagram URL" />
                            </div> 
                            
                            <div className="form-group social-input">
                                <i className="fa fa-linkedin fa-2x"></i>
                                <input type="text" name="linkedin" onChange={this.onChangehandle} value={linkedin}   placeholder="Linkedin URL" />
                            </div>

                        </>:null
                    }

                    
                    
                    <input type="submit" className='btn btn-primary my-1'/>
                    <a href="dashboard.html" className="btn btn-success my-1">Go back</a>

                </form>
            </div>
        )
    }


}
Create.propTypes = {
    createProfile : PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(Create);