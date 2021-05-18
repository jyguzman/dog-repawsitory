import React, { useState, useEffect } from 'react';
import { Box, makeStyles } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
	container: {
		justifyContent: "center",
		paddingTop: "10px"
	},
	media: {
    	height: 300,
    	width: 320
  	},
	paginator: {
		justifyContent: "center",
	    padding: "10px"
	}
}));

const MostSearched = props => {
	const classes = useStyles();
	let topTen = props.topTen;

	return (
		<Container>
			<Box className={classes.container} 
				display={props.hidden ? "none" : "flex"}>
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
						              		<Typography gutterBottom 
						              			variant="h5" component="h2">
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
		</Container>
	);
}

export default MostSearched;