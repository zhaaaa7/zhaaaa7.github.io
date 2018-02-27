import * as actionTypes from "./actionTypes";
import axios from "axios";


export const authStart=()=>{
    //no payload data, used to determine whether to show a spinner
    return {
        type: actionTypes.AUTH_START
    };
};

//store authenticatd data: token id and user id
export const authSuccess=(token,userId)=>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId,
    };
};

export const authFail=(error)=>{
    return {
        type: actionTypes.AUTH_FAIL,
        error:error
    };
};


export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type:actionTypes.AUTH_LOGOUT
    };
};

//the expiration of firebase is 3600s
export const checkAuthTimeout=(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout());
        },expirationTime*1000);  //change to millisecond
    };
};


//submit sign in form
//use middleware to realize async

export const auth = (email, password, isSignup) => {
    return dispatch => {
        
        dispatch(authStart());
        // console.log('authstart callded *****************');
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBpIWodV0c466ghZCctpbaaApnEaa1mQrc';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBpIWodV0c466ghZCctpbaaApnEaa1mQrc';
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                
                // console.log('success to be called');
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                // console.log('***success called',authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};
//determine the redirect path after sign in '/checkout' or '/'
export const setAuthRedirectPath=(path)=>{
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
};

//auto sign in if refresh the page
export const authCheckState=()=>{
    return dispatch=>{
        const token=localStorage.getItem('token');
        if (!token){
            dispatch(logout());
        }else{
            const expirationDate=new Date(localStorage.getItem('expirationDate')) ;
            if(expirationDate<=new Date()){
                dispatch(logout())
            }else{
                const userId=localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expirationDate.getTime()-new Date().getTime())/1000));
            }
            
        }
        
    };
};