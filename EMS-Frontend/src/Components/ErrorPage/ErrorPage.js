import React from 'react';
import Error from '../../Assests/Error.png';

const ErrorPage = () => {
	return (
		<div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
			<img src={Error} style={{ mixBlendMode: 'multiply', filter: 'revert' }} alt='error' />
			<h5>Page not found</h5>
		</div>
	);
};

export default ErrorPage;
