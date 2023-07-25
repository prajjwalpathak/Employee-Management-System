import React from 'react';
import { AiOutlineFileExclamation } from 'react-icons/ai';

function NoRecord() {
	return (
		<div style={{ padding: '1rem', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
			<i className='bi bi-database-exclamation' style={{ fontSize: '4rem' }}></i>
			<span style={{ fontWeight: '500', color: '#000000' }}>No data available</span>
		</div>
	);
}

export default NoRecord;
