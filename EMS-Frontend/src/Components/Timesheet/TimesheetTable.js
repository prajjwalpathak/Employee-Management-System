import React, { useState, useEffect } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import NoRecord from '../NoRecord/NoRecord';
import { fetchTimeSheet } from '../../Services/UserServices/TimesheetService';
import './Timesheet.css';

const TimesheetTable = () => {
	const [timesheet, setTimesheet] = useState(null);

	useEffect(() => {
		fetchTimeSheet()
			.then((data) => {
				setTimesheet(data);
			})
			.catch((e) => {
				console.log(e.message);
			});
	}, []);

	return (
		<section className='timesheet-container'>
			<div className='timesheets-heading'>
				<h5 style={{ fontSize: '1.5rem', marginBottom: '0' }}>My Timesheets</h5>
			</div>
			<table className='dashboard-timesheet-content-div'>
				<tbody className='dashboard-timesheet-tbody-div'>
					{timesheet ? (
						timesheet.map((ele, index) => (
							<tr key={index} className='dashboard-timesheet-card'>
								<td className='dashboard-timesheet-tick'>
									{ele.status === 'Pending' ? (
										<i className='bi bi-check-circle-fill text-secondary icon-center'></i>
									) : (
										<i className='bi bi-check-circle-fill text-success icon-center'></i>
									)}
								</td>
								<td className='dashboard-timesheet-name-div'>
									<img className='dashboard-timesheet-profile-img' src={ele.profileImage} alt='employee' />
									<span className='dashboard-timesheet-name'>{ele.timesheetName}</span>
								</td>
								<td className='dashboard-week-div'>
									<span className='dashboard-week-start'>{`${ele.week.split(' - ')[0]} -`}</span>
									<span className='dashboard-week-end'>{ele.week.split(' - ')[1]}</span>
								</td>
								<td className='dashboard-submitted-hours-div'>
									<span>{ele?.submittedHours || '00'}</span>
									<span>Submitted Hours</span>
								</td>
								<td className='dashboard-approved-hours-div'>
									<span>{ele?.approvedHours || '00'}</span>
									<span>Approved Hours</span>
								</td>
							</tr>
						))
					) : (
						<tr className='dashboard-no-record-div'>
							<td>
								<NoRecord />
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</section>
	);
};

export default TimesheetTable;
