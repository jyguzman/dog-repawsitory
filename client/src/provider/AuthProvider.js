import React, { useState } from 'react';
import {authMethods} from '../firebase/authmethods';

const AuthProvider = (props) => {
	const [inputs, setInputs] = useState({email: '', password: ''});
  	const [errors, setErrors] = useState([]);	
  	const [authType, setAuthType] = useState("");

	const handleSignup = () => {
	    setAuthType("signup");
	    return authMethods.signup(inputs.email, 
	    	inputs.password, setErrors);
	}

	const handleSignin = () => {
	    setAuthType("login"); 
	    return authMethods.signin(inputs.email, 
	    	inputs.password, setErrors);
	}

	const handleSignout = () => {
		setAuthType("signout");
	    return authMethods.signout(setErrors);
	  }

	return (
	    <firebaseAuth.Provider
		    value={{
		      	handleSignup,
		      	handleSignin,
		      	inputs,
		      	authType,
	      		setInputs,
	      		errors,
	      		handleSignout,
		    }}>
		      {props.children}

	    </firebaseAuth.Provider>
	);
};

export default AuthProvider;

export const firebaseAuth = React.createContext();