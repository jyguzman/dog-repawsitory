import React, { useContext } from 'react';
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

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
  	display: 'flex'
  }
}));

const SignupForm = (props) => {
	const classes = useStyles();
	const {handleSignup, inputs, setInputs, errors} = React.useContext(firebaseAuth);

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
	    //push home
	    props.history.push('/');
	  }

	  const handleChange = event => {
	    const {name, value} = event.target;
	    setInputs(prev => ({...prev, [name]: value}));
	  }

	return ( 
		<Container className={classes.container}>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
		        Sign Up
		    </Button>
		    <form onSubmit={handleSubmit}>
				<Dialog disablePortal open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
		        	<DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
			        <DialogContent>
			          <DialogContentText>
			            To sign up to this website, please enter your email address and password.
			          </DialogContentText>
				          
					  <input onChange={handleChange} name="email" placeholder="email" value={inputs.email} />
					  <input onChange={handleChange} name="password" placeholder="password" value={inputs.password} />
					  
			        </DialogContent>
			        <DialogActions>
			        	<Button color="primary" type="submit" onClick={e => handleClose(e)}>
			        		Sign Up
			        	</Button>

				        <Button onClick={e => handleClose(e)} color="primary">
				        	Cancel
				        </Button>
			        </DialogActions>
		      	</Dialog>
	      	</form>
	      	{errors.length > 0 ? errors.map(error => <p style={{color: 'red'}}>{error}</p> ) : null}
		</Container>
	);
};

export default withRouter(SignupForm);