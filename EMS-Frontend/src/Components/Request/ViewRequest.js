import React, { useState, useEffect, useContext } from 'react';
import RequestTabs from './RequestTabs';
import { ReportingGetdata } from '../../Services/UserServices/RequestService';
import { Link } from 'react-router-dom';
import NoRecord from '../NoRecord/NoRecord';
import { RealDataContext } from '../../Context/LoginContext';
import { Pagination } from '@mui/material';
import './Request.css';

function ViewRequest() {
	const [ReportingData, SetReportingData] = useState(null);
	const { isRealTime } = useContext(RealDataContext);
	const [curentPage, setCurrentPage] = useState(1);
	const recordPerPage = 8;
	const lastIndex = curentPage * recordPerPage;
	const firstIndex = lastIndex - recordPerPage;
	const records = ReportingData && ReportingData.slice(firstIndex, lastIndex);

	useEffect(() => {
		ReportingGetdata()
			.then((data) => {
				SetReportingData(data);
			})
			.catch((e) => {
				console.log(e.message);
			});
	}, [isRealTime]);

	return (
		<div className='main-content-container'>
			<div className='tabs-div'>
				<RequestTabs />
			</div>
			<section className='table-container'>
				<div className='table-heading'>
					<div>
						<h1 className='table-title'>Manage Requests</h1>
					</div>
				</div>
				<div className='table-content'>
					<table className='table-content-table'>
						<thead className='table-content-table-head'>
							<tr className='table-head-row'>
								<th className='table-head'>Employee</th>
								<th className='table-head text-center'>Role</th>
								<th className='table-head text-center'>Request</th>
								<th className='table-head text-center'>Type</th>
								<th className='table-head text-center'>Start Date</th>
								<th className='table-head text-center'>End Date</th>
								<th className='table-head text-center'>Status</th>
								<th className='table-head text-center'>Action</th>
							</tr>
						</thead>
						<tbody>
							{records ? (
								records.map((request, index) => (
									<tr key={index}>
										<td className='table-data' style={{ display: 'flex', alignItems: 'center' }}>
											<span>
												<img style={{ width: '2rem', height: '2rem', borderRadius: '50%', marginRight: '1rem' }} src={request.profileImage} alt='employee' />
											</span>
											<span style={{ marginRight: '1rem' }}>{request.hrmid} </span>
											<span>{request.name} </span>
										</td>
										<td className='table-data text-center'>{request.role}</td>
										<td className='table-data text-center'>{request.request}</td>
										<td className='table-data text-center'>{request.leaveType}</td>
										<td className='table-data text-center'>{request.startDate}</td>
										<td className='table-data text-center'>{request.endDate}</td>
										{request.status === 'Approved' ? (
											<td className='table-data text-center'>
												<i className='bi bi-check-circle-fill text-success icon-center icon-size'></i>
											</td>
										) : request.status === 'Rejected' ? (
											<td className='table-data text-center'>
												<i className='bi bi-x-circle-fill text-danger icon-center icon-size'></i>
											</td>
										) : request.status === 'Cancelled' ? (
											<td className='table-data text-center'>
												<i className='bi bi-x-circle-fill text-danger icon-center icon-size'></i>
											</td>
										) : (
											<td className='table-data text-center'>
												<i className='bi bi-hourglass-split text-warning icon-center icon-size'></i>
											</td>
										)}
										{request.status === 'Pending' ? (
											<td className='table-data text-center'>
												<Link className='text-decoration-none text-dark' to={`/dashboard/editrequest/${index}`}>
													<i className='bi bi-pencil-square icon-center icon-size'></i>
												</Link>
											</td>
										) : request.status === 'Approved' ? (
											<td className='table-data text-center'>
												<i className='bi bi-hand-thumbs-up text-success icon-center icon-size'></i>
											</td>
										) : request.status === 'Rejected' ? (
											<td className='table-data text-center'>
												<i className='bi bi-hand-thumbs-down text-danger icon-center icon-size'></i>
											</td>
										) : (
											<td className='table-data text-center'>
												<i className='bi bi-envelope-slash text-danger icon-center icon-size'></i>
											</td>
										)}
									</tr>
								))
							) : (
								<>
									<tr>
										<td colSpan='8'>
											<NoRecord />
										</td>
									</tr>
								</>
							)}
						</tbody>
					</table>
					{records?.length > recordPerPage && (
						<div className='d-flex justify-content-center align-items-center py-3'>
							<Pagination
								count={Math.ceil(ReportingData.length / recordPerPage)}
								style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
								onChange={(event, value) => {
									setCurrentPage(value);
								}}
							/>
						</div>
					)}
				</div>
			</section>
		</div>
	);
}

export default ViewRequest;
