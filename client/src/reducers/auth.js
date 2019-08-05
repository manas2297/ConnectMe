import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    VERIFY_OTP
} from '../actions/types';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    isVerified:null,
    user: {}
}

export default function( state = initialState, action ) {
    const { type, payload } = action;

    switch(type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                isVerified: payload.isVerified,
                user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case VERIFY_OTP:
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                isVerified: payload.isVerified,
                loading:false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token:null,
                isAuthenticated: false,
                isVerified: null,
                loading:false
            }
        case LOGOUT:
            localStorage.removeItem('token');
            history.push('/');
            return {
                ...state,
                token:null,
                isAuthenticated: false,
                isVerified: null,
                loading:false,
                user:{}
            }
       


        default:
            return state;
    }   

}