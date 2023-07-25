import React, { useState, useEffect } from 'react';
import NoRecord from '../NoRecord/NoRecord';
import { fetchTimeSheet } from '../../Services/UserServices/TimesheetService';
import TimesheetTabs from './TimesheetTabs';
import { Pagination } from '@mui/material';

const GetTimesheet = () => {
	const [userTimesheet, setUserTimesheet] = useState(null);
	const [curentPage, setCurrentPage] = useState(1);
	const recordPerPage = 8;
	const lastIndex = curentPage * recordPerPage;
	const firstIndex = lastIndex - recordPerPage;
	const records = userTimesheet && userTimesheet.slice(firstIndex, lastIndex);

	useEffect(() => {
		fetchTimeSheet()
			.then((data) => {
				setUserTimesheet(data);
			})
			.catch((e) => {
				console.log(e.message);
			});
	}, []);

	return (
		<div className='main-content-container'>
			<div className='tabs-div'>
				<TimesheetTabs />
			</div>
			<section className='table-container'>
				<div className='table-heading'>
					<div>
						<h1 className='table-title'>My Timesheets</h1>
					</div>
				</div>
				<div className='table-content'>
					<table className='table-content-table'>
						<thead className='table-content-table-head'>
							<tr className='table-head-row'>
								<th className='table-head'>Employee</th>
								<th className='table-head'>Timesheet</th>
								<th className='table-head text-center'>Date</th>
								<th className='table-head text-center'>Submitted</th>
								<th className='table-head text-center'>Approved</th>
								<th className='table-head text-center'>Status</th>
							</tr>
						</thead>
						<tbody>
							{records ? (
								records.map((timesheet, index) => (
									<tr key={index}>
										<td className='table-data' style={{ display: 'flex', alignItems: 'center' }}>
											<span>
												<img style={{ width: '2rem', height: '2rem', borderRadius: '50%', marginRight: '1rem' }} src={timesheet.profileImage} alt='employee' />
											</span>
											<span style={{ marginRight: '1rem' }}>{timesheet.hrmid} </span>
											<span>{timesheet.name} </span>
										</td>
										<td className='table-data'>{timesheet.timesheetName}</td>
										<td className='table-data text-center'>{timesheet.date}</td>
										<td className='table-data text-center'>{timesheet.submittedHours}</td>
										<td className='table-data text-center'>{timesheet.approvedHours}</td>
										{timesheet.status === 'Approved' ? (
											<td className='table-data text-center'>
												<i className='bi bi-check-circle-fill text-success icon-center icon-size'></i>
											</td>
										) : timesheet.status === 'Rejected' ? (
											<td className='table-data text-center'>
												<i className='bi bi-x-circle-fill text-danger icon-center icon-size'></i>
											</td>
										) : (
											<td className='table-data text-center'>
												<i className='bi bi-hourglass-split text-warning icon-center icon-size'></i>
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
								count={Math.ceil(records.length / recordPerPage)}
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
};

export default GetTimesheet;
