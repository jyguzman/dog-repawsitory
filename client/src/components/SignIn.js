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
import { Box } from "@material-ui/core";
import Input from '@material-ui/core/Input';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MultiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return (<MultiAlert elevation={6} variant="filled" {...props} />);
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

const SignIn = (props) => {
	const classes = useStyles();
	const {handleSignin, inputs, setInputs, errors, setErrors} = React.useContext(firebaseAuth);
	const [isError, setIsError] = React.useState(false);
  	//const [open, setOpen] = React.useState(props.open);
  	const [open2, setOpen2] = React.useState(true);

  	const [open3, setOpen3] = React.useState(false);

  	const [user, setUser] = React.useState(null);
	React.useEffect(() => {
	    firebase.auth().onAuthStateChanged((user) => {
	      setUser(user);
	      setErrors([]);
	    })
  	}, []);
	console.log(user + " " + SignIn.name);
  const handleClick = () => {
    setOpen3((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen3(false);
  };

	  const handleClose2 = (event, reason) => {
	  	if (reason === 'clickaway') {
	      return;
	    }
	    setOpen2(false);
	  };

    const handleSubmit = async (event) => {
	    event.preventDefault();
	    
	    await handleSignin();
	    setOpen2(true);
	}

	  const handleChange = event => {
	    const {name, value} = event.target;
	    setInputs(prev => ({...prev, [name]: value}));
	  }

	return ( 
		<Container className={classes.container}>
		    <form onSubmit={handleSubmit}>
				<Dialog disablePortal open={props.open} onClose={props.closeSignIn} aria-labelledby="form-dialog-title">
			        	<DialogTitle id="form-dialog-title">Log In</DialogTitle>
				        <DialogContent>
				          <DialogContentText>
				            To log in, please enter your email address and password.
				          </DialogContentText>
					       
					    <Container className={classes.input}>
					    	<TextField
					    		noValidate 
					            autoFocus
					            margin="dense"
					            id="email"
					            label="Email Address"
					            type="email"
					            fullWidth
					            name="email"
					            onChange={handleChange}
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
					            onChange={handleChange}
					            value={inputs.password}
					          />
						  	
				        </Container>
				        </DialogContent>
				        <DialogActions>
					        	<Button color="primary" type="submit">
					        		Log In
					        	</Button>

					        <Button onClick={props.closeSignIn} color="primary">
					        	Cancel
					        </Button>
				        </DialogActions>
		      	</Dialog>
	      	</form>
	      	<Box display={(user == null) ? "hidden" : "initial"}>
		      	{errors.length > 0 ? 
					<Snackbar open={open2} autoHideDuration={2500} onClose={handleClose2}>
		        <Alert onClose={handleClose2} severity={"error"}>
		        	{errors[0]}
		        </Alert>
      	  </Snackbar>: null}
			</Box>
		</Container>
	);
};

export default SignIn;