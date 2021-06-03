import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import SignUp from './SignUp';
import SignIn from './SignIn';
import {firebaseAuth} from '../provider/AuthProvider';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase';

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
	const [user, setUser] = React.useState(null);

	React.useEffect(() => {
	    firebase.auth().onAuthStateChanged((user) => {
	      setUser(user);
	    })
  	}, user);

	return (
		
		<Container className={classes.nav}>
			<Grid container direction="row" justify="center" alignItems="center" spacing={3}>
				<Grid item key={1}>
					<Button variant="contained" color="primary" 
						onClick={props.mostPopularHandler}>
						Top Dogs
					</Button>
				</Grid>

				{
						user != null ? 
						<Grid item key={2}>
							<Button className={classes.button} variant="contained" color="primary" 
								onClick={props.showFavorites}>
								Favorite Dogs
							</Button>
						</Grid> : null
				}

			</Grid>
		</Container>
	);
}

//<SignIn  />

export default Nav;