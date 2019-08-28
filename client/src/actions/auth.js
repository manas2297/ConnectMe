import axios from 'axios';
import { setAlert } from './alert';
import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT,
    VERIFY_OTP,
    CLEAR_PROFILE
} from './types';

import setAuthToken from '../utils/setAuthToken';
// import { Json } from 'sequelize/types/lib/utils';


export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try{
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//Register User

export const register = ({name, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    } 

    const body = JSON.stringify({name,email,password});
    try{
        const res = await axios.post('http://localhost:5000/api/users',body, config);
        console.log(res);
        
        
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        // dispatch(loadUser());

    }catch(err){
        console.error(err);
        
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
};

//Login User

export const login = ({ email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    } 

    const body = JSON.stringify({email,password});
    try{
        const res = await axios.post('/api/auth',body, config);
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    }catch(err){
        console.log(err);
        
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
};

export const logout = () => dispatch => {
    dispatch({ type:LOGOUT });
    dispatch({ type:CLEAR_PROFILE});
};

export const verifyotp = (userid, otp) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
       
    }
    console.log('action',userid);
    
    const body = JSON.stringify({otp});
    
    
    try{
        const res = await axios.post(`http://localhost:5000/api/otp/${userid}`,body,config)
        dispatch({
            type: VERIFY_OTP,
            payload:res.data
        });
        // dispatch(loadUser());
    }catch ( err ) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}