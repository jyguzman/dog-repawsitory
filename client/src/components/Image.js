import React, { useState } from 'react';

const Image = ( {url, title, handleOpen} ) => {
	return (
		<div className="dog">
			<img className="hvr-grow" src={url} alt={title}
				onClick={handleOpen} />
		</div>
	);
};

export default Image;