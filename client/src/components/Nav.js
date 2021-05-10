import React from 'react';
import Button from '@material-ui/core/Button';

const Nav = ( {mostPopularHandler} ) => {
	return (
		<div className="mostPopularButton">
			<Button variant="contained" color="primary" onClick={mostPopularHandler}>
				Most Popular
			</Button>
		</div>
	);
}

export default Nav;