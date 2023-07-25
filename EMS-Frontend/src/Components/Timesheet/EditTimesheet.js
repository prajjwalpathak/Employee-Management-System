import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchReportingTimesheet, UpdateReportingTimesheet } from '../../Services/UserServices/TimesheetService';
import { success } from '../../Utils/SuccessToast';
import { serverError } from '../../Utils/ServerToast';
import 'react-toastify/dist/ReactToastify.css';
import { Socket } from '../../Socket';
import TimesheetTabs from './TimesheetTabs';

const EditTimeSheet = () => {
	const navigate = useNavigate();
	const [reportingTimeSheet, SetReportingTimesheet] = useState([]);
	const { id } = useParams();
	const [putTimesheet, setPutTimesheet] = useState(false);
	const [formData, setFormData] = useState({
		id: '',
		userId: '',
		status: ''
	});
	useEffect(() => {
		fetchReportingTimesheet()
			.then((data) => {
				SetReportingTimesheet(data[id]);
			})
			.catch((e) => {
				console.log(e.message);
			});
	}, []);
	useEffect(() => {
		if (putTimesheet) {
			UpdateReportingTimesheet(formData)
				.then((data) => {
					Socket.emit('sendNotifications');
					navigate('/dashboard/viewTime');
					success('Status Updated Successfull');
				})
				.catch((e) => {
					console.log(e.meesage);

					serverError();
				});
		}
	}, [putTimesheet]);

	const handleSubmit = (event) => {
		event.preventDefault();

		setFormData({
			id: reportingTimeSheet.id,
			userId: reportingTimeSheet.userId,
			status: event.target['status'].value
		});
		setPutTimesheet(true);
	};
	return (
		<div className='main-content-container'>
			<div className='tabs-div'>
				<TimesheetTabs />
			</div>
			<section className='table-container'>
				<div className='table-heading'>
					<div>
						<h1 className='table-title'>Edit Timesheet</h1>
					</div>
				</div>
				<div className='table-content'>
					<form className='form-main-container' onSubmit={handleSubmit}>
						<div className='field-div'>
							<div>
								<label className='field-label'>HRMID</label>
							</div>
							<div>
								<input className='field-input' type='text' name='hrmid' value={reportingTimeSheet.hrmid} disabled></input>
							</div>
						</div>
						<div className='field-div'>
							<div>
								<label className='field-label'>Name</label>
							</div>
							<div>
								<input className='field-input' type='text' name='name' value={reportingTimeSheet.name} disabled></input>
							</div>
						</div>
						<div className='field-div'>
							<div>
								<label className='field-label'>Timesheet</label>
							</div>
							<div>
								<input className='field-input' type='text' name='timesheetName' value={reportingTimeSheet.timesheetName} disabled></input>
							</div>
						</div>
						<div className='field-div'>
							<div>
								<label className='field-label'>Client</label>
							</div>
							<div>
								<input className='field-input' type='text' name='clientName' value={reportingTimeSheet.clientName} disabled></input>
							</div>
						</div>
						<div className='field-div'>
							<div>
								<label className='field-label'>Project</label>
							</div>
							<div>
								<input className='field-input' type='text' name='projectName' value={reportingTimeSheet.projectName} disabled></input>
							</div>
						</div>
						<div className='field-div'>
							<div>
								<label className='field-label'>Job</label>
							</div>
							<div>
								<input className='field-input' type='text' name='jobName' value={reportingTimeSheet.jobName} disabled></input>
							</div>
						</div>
						<div className='field-div'>
							<div>
								<label className='field-label'>Work Item</label>
							</div>
							<div>
								<input className='field-input' type='text' name='workItem' value={reportingTimeSheet.workItem} disabled></input>
							</div>
						</div>
						<div className='field-div'>
							<div>
								<label className='field-label'>Description</label>
							</div>
							<div>
								<input className='field-input' type='text' name='description' value={reportingTimeSheet.description} disabled></input>
							</div>
						</div>
						<div className='field-div'>
							<div>
								<label className='field-label'>Date</label>
							</div>
							<div>
								<input className='field-input' type='text' name='date' value={reportingTimeSheet.date} disabled></input>
							</div>
						</div>
						<div className='field-div'>
							<div>
								<label className='field-label'>Week</label>
							</div>
							<div>
								<input className='field-input' type='text' name='date' value={reportingTimeSheet.week} disabled></input>
							</div>
						</div>
						<div className='field-div'>
							<div>
								<label className='field-label'>Total Time</label>
							</div>
							<div>
								<input className='field-input' type='text' name='date' value={reportingTimeSheet.totalTime} disabled></input>
							</div>
						</div>
						<div className='field-div'>
							<div>
								<label className='field-label'>Billable Status</label>
							</div>
							<div>
								<input className='field-input' type='text' name='date' value={reportingTimeSheet.billableStatus} disabled></input>
							</div>
						</div>
						<div className='field-div'>
							<div>
								<label className='field-label'>Submitted Hours</label>
							</div>
							<div>
								<input className='field-input' type='text' name='date' value={reportingTimeSheet.submittedHours} disabled></input>
							</div>
						</div>
						<div className='field-div'>
							<div>
								<label className='field-label'>Status</label>
							</div>
							<div>
								<select className='field-input' name='status'>
									<option value='Pending' selected hidden>
										Pending
									</option>
									<option value='Approve'>Approve</option>
									<option value='Reject'>Reject</option>
								</select>
							</div>
						</div>

						<div style={{ padding: '0.5rem' }}>
							<button className='submit-button' type='submit'>
								Submit
							</button>
							<button
								className='close-button'
								onClick={(e) => {
									navigate(`/dashboard/viewRequest`);
								}}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</section>
		</div>
	);
};

export default EditTimeSheet;
