import React from "react";
import Container from '@material-ui/core/Container';
//
const Header = () => {
	return (
		<Container className="color">
			<div className="header">
				<h1>The Dog Repawsitory</h1>	
				<img height="150" width="150" 
					src={"dog.jpg"} alt="Dog"/>
			</div>
		</Container>
	);
};

export default Header;