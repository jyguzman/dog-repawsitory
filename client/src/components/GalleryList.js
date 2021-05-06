import React, { useState } from 'react';
import Gallery from './Gallery';
import ModalImage from './ModalImage';
import Pagination from "@material-ui/lab/Pagination";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
		paddingTop: "10px"
	},
	paginator: {
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
		    <Container className={classes.container}>
		        {dogs
		          .slice((page - 1) * perPage, page * perPage)
		          .map((dog, index) => {
		            return (
		              <ModalImage className="dog-modal"
			            	url={dog} title={"dog"} key={index+1} />
		            );
		          })}
		    </Container >
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
		          className={classes.paginator}
		        />
		    </Container>
	    </div>
  	);
};




export default GalleryList;