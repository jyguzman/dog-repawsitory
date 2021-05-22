import React, { useState, useContext } from 'react';
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
import {authMethods} from '../firebase/authmethods';
import {firebaseAuth} from '../provider/AuthProvider';
import {withRouter} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
  	display: 'flex',
  	flexDirection: 'column',
  	margin: theme.spacing(1)
  }
}));

const SignUp = (props) => {
	const classes = useStyles();
	const {handleSignup, inputs, setInputs, errors} = React.useContext(firebaseAuth);
	const [pass2, setPass2] = useState("");
  	const [open, setOpen] = React.useState(false);

	  const handleClickOpen = () => {
	    	setOpen(true);
	  };

	  const handleClose = (e) => {
	    	setOpen(false);
	  };

	  const handleSubmit = async (e) => {
	    e.preventDefault();
	    await handleSignup();
	    props.history.push('/');
	  }

	  const handleChange = event => {
	    const {name, value} = event.target;
	    setInputs(prev => ({...prev, [name]: value}));
	  }

	return ( 
		<Container className={classes.container}>
			<Button variant="contained" color="primary" onClick={handleClickOpen}>
		        Sign Up
		    </Button>
		    <form onSubmit={handleSubmit}>
				<Dialog disablePortal open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
		        	<DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
			        <DialogContent>
			          <DialogContentText>
			            To sign up to this website, please enter your email address and password.
			          </DialogContentText>
				          
					  <Container className={classes.input}>
					    	<TextField
					            autoFocus
					            margin="dense"
					            id="email"
					            label="Email Address"
					            type="email"
					            fullWidth
					            name="email"
					            onChange={event => handleChange(event)}
					            value={inputs.email}
					          />
					          <TextField
					            autoFocus
					            margin="dense"
					            id="password"
					            name="password"
					            label="Password"
					            type="password"
					            fullWidth
					            onChange={event => handleChange(event)}
					            value={inputs.password}
					          />
					          <TextField
					            autoFocus
					            margin="dense"
					            id="pass2"
					            name="pass2"
					            label="Password"
					            type="password"
					            fullWidth
					            onChange={event => setPass2(event.target.value)}
					            value={pass2}
					            helperText={(pass2 === "" || pass2 !== inputs.password)
					            	? "Passwords must match." : ""}
					            error={pass2 === "" || pass2 !== inputs.password} 
					          />
						  	
				        </Container>
					  
			        </DialogContent>
			        <DialogActions>
			        	<Button color="primary" 
			        		type="submit" 
			        		disabled={pass2 === "" || pass2 !== inputs.password}
			        		onClick={e => handleClose(e)}>
			        		Sign Up
			        	</Button>

				        <Button onClick={e => handleClose(e)} color="primary">
				        	Cancel
				        </Button>
			        </DialogActions>
		      	</Dialog>
	      	</form>
	      	
		</Container>
	);
};

export default withRouter(SignUp);