import React, { useState, useContext } from "react";
import {firebaseAuth} from '../provider/AuthProvider';
import Container from '@material-ui/core/Container';
import { makeStyles, Grid, Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SignIn from './SignIn';
import SignUp from './SignUp';
import firebase from 'firebase';

const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1
	},
	title: {
	  flexGrow: 1
	},
	text: {
		overflowWrap: "break-word",
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
		<Container>
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
			<Grid item container direction="column" className="color">	
					<p>Search for pictures of dogs by breed!<br></br>Sign up or log in to save your favorites.</p>
					<img className = "headerImg" src={"dog.jpg"} alt="Dog"/>
			</Grid>
		</Container>
		
	);
};

export default Header;