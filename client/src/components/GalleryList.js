import React, { useState } from 'react';
import Gallery from './Gallery';
import ModalImage from './ModalImage';
import Pagination from "@material-ui/lab/Pagination";
import { Box, Container, makeStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
	root: {
	    display: 'flex',
	    flexWrap: 'wrap',
	    justifyContent: 'space-around',
	    overflow: 'hidden',
	    backgroundColor: theme.palette.background.paper,
	},
	gridList: {
	    width: 750,
	    height: 450,
	    paddingRight: '0px'
	},
	container: {
		flexWrap: "wrap",
		justifyContent: "center",
		paddingTop: "10px"
	},
	paginator: {
		display: "flex",
		justifyContent: "center",
	    padding: "10px"
	}
}));

const GalleryList = props => {
	const classes = useStyles();
	const dogs = props.data;
	const numDogs = dogs.length;
	const perPage = 9;
	let [page, setPage] = useState(1);

	const handlePageChange = (event, value) => {
		setPage(value);
	};

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
		    <Container className={classes.container}>
		        <Pagination
		          count={Math.ceil(numDogs/perPage)}
		          page={page}
		          onChange={handlePageChange}
		          defaultPage={1}
		          color="primary"
		          size="large"
		          variant="outlined"
		          showFirstButton
		          showLastButton
		          disabled={props.hidden ? true : false}
		          className={classes.paginator}
		        />
		    </Container>
	    </div>
  	);
};




export default GalleryList;