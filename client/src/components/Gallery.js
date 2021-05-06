import React from 'react';
import Image from "./Image";
import ModalImage from './ModalImage';

/** else {
		return (
			<div className="search-imgs">
				<h1>Search for an image!</h1>
			</div>
		);
	}*/

const Gallery = props => {
	let dogs = props.data;

	if (dogs.length > 0) {
		return (
			<div className="dogs">
		        {dogs &&
		          dogs.map((dog, index) => {
		            return (
		            <ModalImage  
		            	url={dog} title={"dog"} key={index+1} />
		            );
		          })
		        }
		    </div>
		);
	}
};

export default Gallery;