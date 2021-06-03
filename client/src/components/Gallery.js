import React, { useState } from 'react';
import ModalImage from './ModalImage';
import Pagination from "@material-ui/lab/Pagination";
import { Box, Container, makeStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import firebase from 'firebase';

const Gallery = props => {
	const dogs = props.data;
	const page = props.page;
	const perPage = props.perPage;

	return (
		<Container>
		    <Box className="dogs"
			    display={props.hidden ? "none" : "flex"}>
			    <Grid container direction="row" justify="center" alignItems="center" 
			    	spacing={1}>
				    {dogs
				        .slice((page - 1) * perPage, page * perPage)
				        .map((dog, index) => {
				            return (
				            	<Grid item key={index} xs={6} sm={6} md={4} lg={4} xl={4}>
				            			<ModalImage auth={props.auth} 
						            		url={dog} title={"dog"} key={index+1} />      
				            			
				            			
						        </Grid>
				            );
				        })}
				</Grid>
		    </Box>
	    </Container>
  	);
};

export default Gallery;