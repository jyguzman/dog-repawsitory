import React, { useState } from 'react';
import ModalImage from './ModalImage';
import Pagination from "@material-ui/lab/Pagination";
import { Box, Container, makeStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

const FavoritesGallery = props => {
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
				            	<Grid item key={index} xs={4}>
				            			<ModalImage auth={false}
						            		url={dog} title={"dog"} key={index+1} />      
				            			
						        </Grid>
				            );
				        })}
				</Grid>
		    </Box>
	    </Container>
  	);
};

export default FavoritesGallery;