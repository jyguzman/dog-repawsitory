import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, makeStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme, props)=> ({
	root: {
	    display: 'flex',
	    flexWrap: 'wrap',
	    justifyContent: 'space-around',
	    overflow: 'hidden',
	    backgroundColor: theme.palette.background.paper,
	},
	container: {
		//display: "flex",
		//flexWrap: "wrap",
		justifyContent: "center",
		paddingTop: "10px"
	},
	media: {
    	height: 250,
    	width: 350
  	},
	paginator: {
		justifyContent: "center",
	    padding: "10px"
	}
}));

const MostSearched = props => {
	const classes = useStyles(props);
	let topTen = props.topTen;

	let getURL = breed => {
		return ""
	};

	return (
		<Box className={classes.container} display={props.hidden ? "none" : "flex"}>
		    	<Grid className="mostPopularDogs" 
		    		container direction="row" 
		    		justify="center" alignItems="center" 
		    		spacing={2}>
			        {topTen
			          .map((dog, index) => {
			            return (
			            	<Grid item key={index} xs={4}>
				              <Card >
				              	<CardMedia
				              		className={classes.media}
				              		image={dog.image}
				              		title="dog"
				              	/>
				              	<Grid container justify="center">
					              	<CardContent>
					              		<Typography gutterBottom variant="h5" component="h2">
	            							{dog.breed}
	          							</Typography>
					              	</CardContent>
				              	</Grid>
				              </Card>
					        </Grid>
			            );
			          })}
			    </Grid>
		</Box >
	);
}

export default MostSearched;