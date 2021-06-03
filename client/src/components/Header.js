import React from "react";
import Container from '@material-ui/core/Container';
import { makeStyles, Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SignIn from './SignIn';
import SignUp from './SignUp';

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

const Header = () => {
	const classes = useStyles();
	return (
		<Container>
			<Grid item container direction="column" className="color">	
					<h1>The Dog Repawsitory</h1>
					<img className = "headerImg" src={"dog.jpg"} alt="Dog"/>
			</Grid>
		</Container>
		
	);
};

export default Header;