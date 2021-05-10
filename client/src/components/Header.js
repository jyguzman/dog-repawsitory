import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 125,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
	const classes = useStyles();

	return (
    <div className="color">
			<div className="header">
				<h1>The Dog Repawsitory</h1>	
				<img height="150" width="150" 
					src={"dog.jpg"} alt="Dog"/>
			</div>
    </div>
	);
};

export default Header;