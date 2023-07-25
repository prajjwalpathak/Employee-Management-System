import { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { availableRequest } from '../../Services/UserServices/RequestService';
import { Link } from 'react-router-dom';
import 'react-circular-progressbar/dist/styles.css';
import './Request.css';

const RequestTable = () => {
	const [requestsData, setRequestsData] = useState({});

	useEffect(() => {
		availableRequest()
			.then((data) => {
				setRequestsData(data);
			})
			.catch((e) => {
				console.log(e.message);
			});
	}, []);

	return (
		<div className='dashboard-request-table-container'>
			<div>
				<h6 className='dashboard-request-table-title'>My Requests</h6>
			</div>
			<div className='dashboard-request-table-content-div'>
				<div className='dashboard-request-table-data'>
					<div style={{ width: 40, height: 40 }}>
						<CircularProgressbar
							value={requestsData?.takenCasualLeaves || 0}
							styles={{
								path: { stroke: '#ff6e6e' },
								text: {
									fontSize: '2rem',
									transform: 'translateY(4px)'
								}
							}}
							text={`${requestsData?.takenCasualLeaves || 0}`}
							maxValue={requestsData?.totalCasualLeaves}
						/>
					</div>
					<div className='dashboard-request-table-data-value'>
						<span className='dashboard-request-table-data-span' style={{ fontSize: '0.9rem' }}>
							Casual Leave
							<span className=' text-secondary' style={{ fontSize: '0.7rem' }}>
								Available {requestsData?.remainingCasualLeaves || 0} days
							</span>
						</span>
					</div>
				</div>
				<div className='dashboard-request-table-data'>
					<div style={{ width: 40, height: 40 }}>
						<CircularProgressbar
							value={requestsData?.takenLeaveWithoutPays || 0}
							styles={{
								path: { stroke: '#1FC3B7' },
								text: {
									fontSize: '2rem',
									transform: 'translateY(4px)'
								}
							}}
							text={`${requestsData?.takenLeaveWithoutPays || 0}`}
							maxValue={requestsData?.totalLeaveWithoutPays}
						/>
					</div>
					<div className='dashboard-request-table-data-value'>
						<span className='dashboard-request-table-data-span' style={{ fontSize: '0.9rem' }}>
							Leave Without Pay
							<span className=' text-secondary' style={{ fontSize: '0.7rem' }}>
								Available {requestsData?.remainingLeaveWithoutPays || 0} days
							</span>
						</span>
					</div>
				</div>
				<div className='dashboard-request-table-data'>
					<div style={{ width: 40, height: 40 }}>
						<CircularProgressbar
							value={requestsData?.takenRestrictedHolidays || 0}
							styles={{
								path: { stroke: '#8584e8' },
								text: {
									fontSize: '2rem',
									transform: 'translateY(4px)'
								}
							}}
							text={`${requestsData?.takenRestrictedHolidays || 0}`}
							maxValue={requestsData?.totalRestrictedHolidays}
						/>
					</div>
					<div className='dashboard-request-table-data-value'>
						<span className='dashboard-request-table-data-span' style={{ fontSize: '0.9rem' }}>
							Restricted Holiday
							<span className=' text-secondary' style={{ fontSize: '0.7rem' }}>
								Available {requestsData?.remainingRestrictedHolidays || 0} days
							</span>
						</span>
					</div>
				</div>
				<div className='dashboard-request-table-data'>
					<div style={{ width: 40, height: 40 }}>
						<CircularProgressbar
							value={requestsData?.takenWorkFromHomes || 0}
							styles={{
								path: { stroke: '#1FC3B7' },
								text: {
									fontSize: '2rem',
									transform: 'translateY(4px)'
								}
							}}
							text={`${requestsData?.takenWorkFromHomes || 0}`}
							maxValue={requestsData?.totalWorkFromHomes}
						/>
					</div>
					<div className='dashboard-request-table-data-value'>
						<span className='dashboard-request-table-data-span' style={{ fontSize: '0.9rem' }}>
							Work From Home
							<span className=' text-secondary' style={{ fontSize: '0.7rem' }}>
								Available {requestsData?.remainingWorkFromHomes || 0} days
							</span>
						</span>
					</div>
				</div>
			</div>

			<div className='dashboard-request-table-button-div'>
				<Link to='leave'>
					<button className='btn btn-primary' style={{ padding: '0.2rem 1rem' }}>
						Apply Leave
					</button>
				</Link>
			</div>
		</div>
	);
};

export default RequestTable;
