import React, { useState, useContext } from "react";
import {firebaseAuth} from '../provider/AuthProvider';
import Container from '@material-ui/core/Container';
import { makeStyles, Grid, Button, Paper, CardMedia } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SignIn from './SignIn';
import SignUp from './SignUp';
import firebase from 'firebase';

const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
		marginTop: "25px"
	},
	title: {
	  flexGrow: 1
	},
	media: {
		maxHeight: 500,
		maxWidth: 500
	}
}));

const Header = (props) => {
	const classes = useStyles();
	const {handleSignout} = useContext(firebaseAuth);
	const [user, setUser] = React.useState(null);
	const [openLogIn, setOpenLogIn] = useState(false);
	const [openSignUp, setOpenSignUp] = useState(false);

	const openSignin = () => {
		setOpenLogIn(true);
	};

	const closeSignin = () => {
		setOpenLogIn(false);
	}

	const openSignup = () => {
		setOpenSignUp(true);
	};

	const closeSignUp = () => {
		setOpenSignUp(false);
	}

	React.useEffect(() => {
	    firebase.auth().onAuthStateChanged((user) => {
	      setUser(user);
	    })
  	}, user);

	return (
		<Container className={classes.root}>
			<AppBar>
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						The Dog Repawsitory
					</Typography>
					{
						user == null ? 
						<Grid item key={3}>
							<Button className={classes.button} color="inherit" 
								onClick={openSignup}>
								Sign Up
							</Button>
							<SignUp open={openSignUp} closeSignUp={closeSignUp}/>	
						</Grid> : null
					}

					{
						user == null ? 
						<Grid item key={4}>
							<Button className={classes.button} color="inherit" 
								onClick={openSignin}>
								Log In
							</Button>
							<SignIn  open={openLogIn} closeSignIn={closeSignin}/> 		
						</Grid> : null
					}

					{
						user != null ? 
						<Grid item key={5}>
							<Button className={classes.button} color="inherit" 
								onClick={handleSignout}>
								Sign Out
							</Button>
						</Grid> : null
					}
				</Toolbar>
			</AppBar>			
		</Container>
		
	);
};

export default Header;