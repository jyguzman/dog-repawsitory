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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Box } from "@material-ui/core";
import Input from '@material-ui/core/Input';

function Alert(props) {
  return (<MuiAlert elevation={6} variant="filled" {...props} />);
}

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

const SignIn = () => {
	const classes = useStyles();
	const {handleSignin, inputs, setInputs, errors} = React.useContext(firebaseAuth);

  	const [open, setOpen] = React.useState(false);
  	const [alertOpen, setAlertOpen] = React.useState(false);

	  const handleClickOpen = () => {
	    	setOpen(true);
	  };

	  const handleClose = (e) => {
	    	setOpen(false);
	  };

	  const handleAlertOpen = () => {
	  		setAlertOpen(true);
	  }

	  const handleAlertClose = (e, reason) => {
	  	if (reason === 'clickaway') {
	      return;
	    }

    	setAlertOpen(false);
	  };

	  const handleSubmit = async (e) => {
	    e.preventDefault();
	    await handleSignin();
	    setAlertOpen(errors.length > 0);
	  }

	  const handleChange = event => {
	    const {name, value} = event.target;
	    console.log(inputs);
	    setInputs(prev => ({...prev, [name]: value}));
	  }

	return ( 
		<Container className={classes.container}>
			<Button variant="contained" color="primary" onClick={handleClickOpen}>
		        Log In
		    </Button>
		    <form onSubmit={handleSubmit}>
				<Dialog disablePortal open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			        	<DialogTitle id="form-dialog-title">Log In</DialogTitle>
				        <DialogContent>
				          <DialogContentText>
				            To log in, please enter your email address and password.
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
						  	
				        </Container>
				        </DialogContent>
				        <DialogActions>
				        	<Button color="primary" type="submit" onClick={e => {handleClose(e);}}>
				        		Log In
				        	</Button>

					        <Button onClick={e => handleClose(e)} color="primary">
					        	Cancel
					        </Button>
				        </DialogActions>
		      	</Dialog>
	      	</form>
	      	
				<Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
			        <Alert onClose={handleAlertClose} severity="error">
			          {errors[0]}
			        </Alert>
		      	</Snackbar>
	      	
		</Container>
	);
};

export default SignIn;