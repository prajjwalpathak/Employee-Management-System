import React, { useState, useEffect } from 'react';
import { Socket } from '../../Socket';
import { useParams, useNavigate } from 'react-router-dom';
import { ReportingGetdata, updateUserRequest } from '../../Services/UserServices/RequestService';
import { success } from '../../Utils/SuccessToast';
import 'react-toastify/dist/ReactToastify.css';
import { serverError } from '../../Utils/ServerToast';
import RequestTabs from './RequestTabs';

function EditRequest() {
	//get data
	const navigate = useNavigate();
	const [ReportingData, SetReportingData] = useState([]);
	const { id } = useParams();
	const [formData, setFormData] = useState({
		userId: '',
		requestId: '',
		status: ''
	});
	const [putData, setPutData] = useState(false);
	useEffect(() => {
		ReportingGetdata()
			.then((ReportingRequestdata) => {
				SetReportingData(ReportingRequestdata[id]);
			})
			.catch((e) => {
				console.log(e.message);
			});
	}, []);

	useEffect(() => {
		if (putData) {
			updateUserRequest(formData)
				.then((data) => {
					Socket.emit('sendNotifications');
					navigate('/dashboard/viewRequest');
					success('Status Updated Successfull');
				})
				.catch((e) => {
					serverError();
				});
		}
	}, [putData]);

	//put method

	const handleSubmit = (event) => {
		event.preventDefault();

		setFormData({
			userId: ReportingData.userId,
			requestId: ReportingData.id,
			status: event.target['status'].value
		});

		setPutData(true);
	};
	return (
		<div className='main-content-container'>
			<div className='tabs-div'>
				<RequestTabs />
			</div>
			<section className='table-container'>
				<div className='table-heading'>
					<div>
						<h1 className='table-title'>Edit Request</h1>
					</div>
				</div>
				<div className='table-content'>
					<form className='form-main-container' onSubmit={handleSubmit}>
						<div className='field-div'>
							<div>
								<label className='field-label'>HRMID</label>
							</div>
							<div>
								<input className='field-input' type='text' name='hrmid' value={ReportingData.hrmid} disabled></input>
							</div>
						</div>
						<div className='field-div'>
							<div>
								<label className='field-label'>Name</label>
							</div>
							<div>
								<input className='field-input' type='text' name='name' value={ReportingData.name} disabled></input>
							</div>
						</div>
						<div className='field-div'>
							<div>
								<label className='field-label'>Email</label>
							</div>
							<div>
								<input className='field-input' type='text' name='email' value={ReportingData.email} disabled></input>
							</div>
						</div>
						<div className='field-div'>
							<div>
								<label className='field-label'>Role</label>
							</div>
							<div>
								<input className='field-input' type='text' name='role' value={ReportingData.role} disabled></input>
							</div>
						</div>
						<div className='field-div'>
							<div>
								<label className='field-label'>Request</label>
							</div>
							<div>
								<input className='field-input' type='text' name='request' value={ReportingData.request} disabled></input>
							</div>
						</div>
						<div className='field-div'>
							<div>
								<label className='field-label'>Type</label>
							</div>
							<div>
								<input className='field-input' type='text' name='type' value={ReportingData.leaveType} disabled></input>
							</div>
						</div>
						<div className='field-div'>
							<div>
								<label className='field-label'>Start Date</label>
							</div>
							<div>
								<input className='field-input' type='text' name='startDate' value={ReportingData.startDate} disabled></input>
							</div>
						</div>
						<div className='field-div'>
							<div>
								<label className='field-label'>End Date</label>
							</div>
							<div>
								<input className='field-input' type='text' name='endDate' value={ReportingData.endDate} disabled></input>
							</div>
						</div>
						<div className='field-div'>
							<div>
								<label className='field-label'>Reason</label>
							</div>
							<div>
								<textarea className='field-input' type='text' name='reason' value={ReportingData.reason} disabled></textarea>
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
}
export default EditRequest;
