import React from 'react';
import wfh from '../../Assests/WFH.svg';
import { useNavigate, Link } from 'react-router-dom';

const DashboardWFH = () => {
	const navigate = useNavigate();
	return (
		<div className='dashboard-request-table-container'>
			<div>
				<h6 className='dashboard-request-table-title'>Want to work from home?</h6>
			</div>
			<div className='d-flex'>
				<div style={{ height: '10rem' }}>
					<img src={wfh} alt='' className='img-fluid' style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
				</div>
			</div>
			<div className='dashboard-request-table-button-div'>
				<Link to='leave'>
					<button className='btn btn-primary' style={{ padding: '0.2rem 1rem' }}>
						Apply WFH
					</button>
				</Link>
			</div>
		</div>
	);
};

export default DashboardWFH;
