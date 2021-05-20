import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import "firebase/auth";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
  	display: 'flex'
  }
}));

const SignupForm = ( { onSuccess } ) => {
	const classes = useStyles();
	const [email, setEmail] = React.useState("");
  	const [password, setPassword] = React.useState("");

  	const [open, setOpen] = React.useState(false);

	  const handleClickOpen = () => {
	    setOpen(true);
	  };

	  const handleClose = (e, loggedIn) => {
	  	if (loggedIn)
	  		handleLogin(e);
	    setOpen(false);
	  };

  	const handleLogin = async (e) => {
	    e.preventDefault();
	    const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
		  .then((userCredential) => {
		    // Signed in 
		    var user = userCredential.user;
		    // ...
		  })
		  .catch((error) => {
		    var errorCode = error.code;
		    var errorMessage = error.message;
		    // ..
		  });
	    return;
  	};

	return ( 
		<Container className={classes.container}>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
		        Login
		    </Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
	        	<DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
		        <DialogContent>
		          <DialogContentText>
		            To sign up to this website, please enter your email address and password.
		          </DialogContentText>
		          <TextField
		            autoFocus
		            margin="dense"
		            id="name"
		            label="Email Address"
		            type="email"
		            fullWidth
		            value={email}
		            onChange={(event) => setEmail(event.target.value)}
		          />
		          <br></br>
		          <TextField
		            autoFocus
		            margin="dense"
		            id="name"
		            label="Password"
		            type="password"
		            value={password}
		            onChange={(event) => setPassword(event.target.value)}
		          />
		        </DialogContent>
		        <DialogActions>
		          <Button onClick={e => handleClose(e, false)} color="primary">
		            Cancel
		          </Button>
		          <Button onClick={e => handleClose(e, true)} color="primary">
		            Sign up
		          </Button>
		        </DialogActions>
	      	</Dialog>
		</Container>
	);
};

export default SignupForm;