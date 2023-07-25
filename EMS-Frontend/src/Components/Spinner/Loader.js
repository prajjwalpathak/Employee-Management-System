import React from 'react';
import loader from '../../Assests/Loader.gif';
function Loader() {
	return (
		<>
			<div
				className='text-center fs-1 mt-4 d-flex flex-column 
        justify-content-center align-items-center'
				style={{ height: '100%' }}
			>
				<img src={loader} alt='loading' style={{ filter: 'brightness(120%)', mixBlendMode: 'multiply' }} />
				<p className='text-dark fs-1'>Loading</p>
			</div>
		</>
	);
}

export default Loader;
