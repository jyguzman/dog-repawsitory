import React, { useState } from 'react';
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	paginator: {
		display: "flex",
		justifyContent: "center",
	    padding: "10px"
	}
}));

const Paginator = props => {
	const classes = useStyles();

	return (
		<Pagination
			count={props.pages}
			page={props.page}
			onChange={props.handlePageChange}
			defaultPage={1}
			color="primary"
     		size="large"
            variant="outlined"
			showFirstButton
			showLastButton
			disabled={props.isDisabled}
			className={classes.paginator}
		/>
    );
};

export default Paginator;