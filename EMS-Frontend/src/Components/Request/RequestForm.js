import React, { useState, useEffect } from 'react';
import { leaveRequest, leaveUser } from '../../Services/UserServices/RequestService';
import { success } from '../../Utils/SuccessToast';
import { Error } from '../../Utils/ErrorToast';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import RequestTabs from './RequestTabs';
import { Socket } from '../../Socket';
import './Request.css';

const WFHform = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		startDate: '',
		endDate: '',
		request: '',
		leaveType: '',
		reason: ''
	});
	const [formErrors, setFormErrors] = useState({});
	const [isFilled, setFilled] = useState(false);
	const [userData, setUserDatas] = useState(null);
	// const FormData = new URLSearchParams(formData);

	useEffect(() => {
		leaveUser()
			.then((data) => {
				setUserDatas(data);
			})
			.catch((e) => {
				console.log(e.message);
			});
	}, []);

	useEffect(() => {
		if (isFilled) {
			leaveRequest(formData)
				.then((data) => {
					Socket.emit('sendNotifications');
					navigate('/dashboard/getRequest');
					success('Request submitted Succesfully');
				})
				.catch((e) => {
					Error('Connection  Server Lost');
				});
		}

		return () => {
			// setFilled(false);
			setFormData({
				email: '',
				startDate: '',
				endDate: '',
				request: '',
				leaveType: '',
				reason: ''
			});
		};
	}, [isFilled]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const errors = {};
		if (!formData.email) {
			errors.email = 'Please enter your email';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.email = 'Please enter a valid email address';
		}

		if (!formData.reason) {
			errors.reason = 'Please enter a reason';
		}
		if (!formData.startDate) {
			errors.startDate = 'Please enter a start date';
		}
		if (!formData.startDate) {
			errors.endDate = 'Please enter a end date';
		}
		if (!formData.request) {
			errors.request = 'Please enter a request';
		}
		if (Object.keys(errors).length === 0) {
			setFilled(() => {
				return true;
			});
		} else {
			setFormErrors(errors);
		}
	};
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	return (
		<div className='main-content-container'>
			<div className='tabs-div'>
				<RequestTabs />
			</div>
			<section className='table-container'>
				<div className='table-heading'>
					<div>
						<h1 className='table-title'>Add Request</h1>
					</div>
				</div>
				<div className='table-content'>
					<form className='form-main-container' onSubmit={handleSubmit}>
						<div className='field-div'>
							<div>
								<label className='field-label'>HRMID</label>
							</div>
							<div>
								<input className='field-input' type='text' name='userId' value={userData?.hrmid} onChange={handleChange}></input>
							</div>
						</div>
						<div className='field-div'>
							<div style={{}}>
								<label className='field-label'>Email</label>
							</div>
							<div>
								<input className='field-input' type='email' name='email' value={formData.email} onChange={handleChange}></input>
								{formErrors.email && (
									<p
										className='text-danger'
										style={{
											marginLeft: '6rem'
										}}
									>
										{formErrors.email}
									</p>
								)}
							</div>
						</div>

						<div className='field-div'>
							<div>
								<label className='field-label'>Request</label>
							</div>
							<div>
								<select className='field-input' name='request' value={formData.request} onChange={handleChange}>
									<option hidden>Select Request</option>
									<option value='Casual Leave'>Casual Leave</option>
									<option value='Work From Home'>Work From Home</option>
									<option value='Restricted Holiday'>Restricted Holiday</option>
									<option value='Leave Without Pay'>Leave Without Pay</option>
								</select>
								{formErrors.request && (
									<p
										className='text-danger'
										style={{
											marginLeft: '6rem'
										}}
									>
										{formErrors.request}
									</p>
								)}
							</div>
						</div>

						<div className='field-div'>
							<div>
								<label className='field-label'>Date</label>
							</div>
							<div className='date-input-div'>
								<div>
									<label className='date-label'>From</label>
									<input className='date-input' type='date' name='startDate' value={formData.startDate} onChange={handleChange}></input>
									{formErrors.startDate && (
										<p
											className='text-danger'
											style={{
												marginLeft: '7rem'
											}}
										>
											{formErrors.startDate}
										</p>
									)}
								</div>
								<div>
									<label className='date-label'>To</label>
									<input className='date-input' type='date' name='endDate' value={formData.endDate} onChange={handleChange}></input>
									{formErrors.endDate && (
										<p
											className='text-danger'
											style={{
												marginLeft: '1rem'
											}}
										>
											{formErrors.endDate}
										</p>
									)}
								</div>
							</div>
						</div>

						<div className='field-div'>
							<div>
								<label className='field-label'>Type</label>
							</div>
							<div>
								<select className='field-input' name='leaveType' value={formData.leaveType} onChange={handleChange}>
									<option hidden>Select Type</option>
									<option value='Half Day'>Half Day</option>
									<option value='Full Day'>Full Day</option>
								</select>
							</div>
						</div>

						<div className='field-div'>
							<div>
								<label className='field-label'>Reason</label>
							</div>
							<div>
								<textarea className='field-input' rows={4} type='text' name='reason' value={formData.reason} onChange={handleChange}></textarea>
								{formErrors.reason && (
									<p
										className='text-danger'
										style={{
											marginLeft: '6rem'
										}}
									>
										{formErrors.reason}
									</p>
								)}
							</div>
						</div>
						<div style={{ padding: '0.5rem' }}>
							<button className='submit-button' type='submit'>
								Submit
							</button>
							<button
								className='close-button'
								onClick={(e) => {
									e.preventDefault();
									setFormData({
										email: '',
										startDate: '',
										endDate: '',
										request: '',
										leaveType: '',
										reason: ''
									});
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

export default WFHform;
