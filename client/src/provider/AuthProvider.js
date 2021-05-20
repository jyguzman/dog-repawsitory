import React from 'react';
import {authMethods} from '../firebase/authmethods'
const AuthProvider = (props) => {

	const handleSignup = () => {
	    // middle man between firebase and signup 
	    console.log('handleSignup')
	    // calling signup from firebase server
	    return authMethods.signup()
	}

	return (
	    <firebaseAuth.Provider
	    value={{
	      handleSignup
	    }}>
	      {props.children}

	    </firebaseAuth.Provider>
	);
};

export default AuthProvider;

export const firebaseAuth = React.createContext();