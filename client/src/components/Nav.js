import React from 'react';
import Button from '@material-ui/core/Button';

const Nav = ( {mostPopularHandler} ) => {
	return (
		<div className="mostPopularButton">
			<Button variant="contained" color="primary" onClick={mostPopularHandler}>
				Top Dogs
			</Button>
		</div>
	);
}

export default Nav;