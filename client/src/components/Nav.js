import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import SignupForm from './SignupForm';
import SignIn from './SignIn';
import {firebaseAuth} from '../provider/AuthProvider';

const useStyles = makeStyles((theme) => ({
  nav: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '15px',
    paddingBottom: '15px',
  },
  button: {
  	justifyContent: 'center'
  },
  topDogs: {
  	marginRight: '25px'
  }
}));

const Nav = (props) => {
	const classes = useStyles();
	const {handleSignout} = useContext(firebaseAuth);

	return (
		<Container className={classes.nav}>
			<Button className={classes.topDogs} variant="contained" color="primary" 
				onClick={props.mostPopularHandler}>
				Top Dogs
			</Button>
			<Box display={props.auth ? "initial" : "none"}>
				<Button className={classes.button} variant="contained" color="primary" 
					onClick={props.showFavorites}>
					Favorite Dogs
				</Button>
			</Box>
			<Box display={props.auth ? "none" : "initial"}> 
				<SignupForm />
			</Box>
			<Box display={props.auth ? "none" : "initial"}>
				<SignIn />
			</Box>
			<Box display={props.auth ? "initial" : "none"}>
				<Button className={classes.button} variant="contained" color="primary" 
					onClick={handleSignout}>
					Sign Out
				</Button>
			</Box>
		</Container>
	);
}

export default Nav;