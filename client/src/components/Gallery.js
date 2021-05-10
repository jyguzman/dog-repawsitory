import React from 'react';
import Image from "./Image";
import ModalImage from './ModalImage';

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