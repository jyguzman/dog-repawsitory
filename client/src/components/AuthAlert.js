import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return (<MuiAlert elevation={6} variant="filled" {...props} />);
}

const AuthAlert = props => {
	const isSignUp = props.signedUp;
	const isError = props.isError;
	const error = props.error;

	const loginMsg = "Successfully logged in!";
	const signUpMsg = "Successfully signed up!";

	const [alertOpen, setAlertOpen] = React.useState(isSignUp);

	const handleAlertOpen = () => {
	    setAlertOpen(true);
	}

	const handleAlertClose = (e, reason) => {
		if (reason === 'clickaway') {
	      return;
	    }
    	setAlertOpen(false);
	};

	return (
		<Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
			<Alert onClose={handleAlertClose} 
				severity={props.isError ? "error" : "success"}>
			    {props.isError ? props.error : 
			    		(props.signedUp ? signUpMsg : loginMsg)}
			</Alert>
		</Snackbar>
	);
};

export default AuthAlert;