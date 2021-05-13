import React, { useState } from 'react';
import ModalImage from './ModalImage';
import Pagination from "@material-ui/lab/Pagination";
import { Box, Container, makeStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
	container: {
		flexWrap: "wrap",
		justifyContent: "center",
		paddingTop: "10px"
	}
}));

const Gallery = props => {
	const classes = useStyles();
	const dogs = props.data;
	const page = props.page;
	const perPage = props.perPage;

	return (
	    <div className="dogs">
		    <Box className={classes.container} 
		    	display={props.hidden ? "none" : "flex"}>
		    	<Grid container direction="row" justify="center" alignItems="center" 
		    	spacing={1}>
			        {dogs
			          .slice((page - 1) * perPage, page * perPage)
			          .map((dog, index) => {
			            return (
			            	<Grid item key={index} xs={4}>
			            			<ModalImage 
					            		url={dog} title={"dog"} key={index+1} />      
					        </Grid>
			            );
			          })}
			    </Grid>
		    </Box>
	    </div>
  	);
};

export default Gallery;