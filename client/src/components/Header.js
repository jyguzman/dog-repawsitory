import React from "react";
import Container from '@material-ui/core/Container';

const Header = () => {
	return (
		<Container className="color">
				<h1>The Dog Repawsitory</h1>	
				<img className = "headerImg" src={"dog.jpg"} alt="Dog"/>
		</Container>
	);
};

export default Header;