import { useState, useEffect } from 'react';
import { addNewUser } from '../../Services/AdminServices/AdminUserService';
import { success } from '../../Utils/SuccessToast';
import './AddUser.css';

const AdminAddUser = ({ setOpen }) => {
	const [formData, setFormData] = useState(null);
	const [isFormFilled, setFormFilled] = useState(false);

	const handleChange = (event) => {
		const { value, name } = event.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setFormFilled((prev) => !prev);
	};

	useEffect(() => {
		if (isFormFilled) {
			addNewUser(formData)
				.then((data) => {
					success(data.msg);
					setOpen(false);
				})
				.catch((e) => {
					console.log(e.message);
				});
		}
	}, [isFormFilled]);

	return (
		<div className='modal-container-div'>
			<div className='modal-div'>
				<form className='form-main-container' onSubmit={handleSubmit} style={{ marginTop: '0' }}>
					<div className='field-div'>
						<label htmlFor='hrmid' className='field-label'>
							HRMID
						</label>
						<input type='text' name='hrmid' id='hrmid' className='field-input' onChange={handleChange} required />
					</div>

					<div className='field-div'>
						<label htmlFor='name' className='field-label'>
							Name
						</label>
						<input type='text' name='name' id='name' className='field-input' onChange={handleChange} required />
					</div>

					<div className='field-div'>
						<label htmlFor='email' className='field-label'>
							Email
						</label>
						<input type='email' name='email' id='name' className='field-input' onChange={handleChange} required />
					</div>

					<div className='field-div'>
						<label htmlFor='phone' className='field-label'>
							Phone
						</label>
						<input type='text' name='phone' id='phone' className='field-input' onChange={handleChange} required />
					</div>

					<div className='field-div'>
						<label htmlFor='role' className='field-label'>
							Role
						</label>
						<input type='text' name='role' id='role' className='field-input' onChange={handleChange} required />
					</div>

					<div className='field-div'>
						<label htmlFor='Department' className='field-label'>
							Department
						</label>
						<input type='text' name='department' id='Department' className='field-input' onChange={handleChange} required />
					</div>

					<div className='field-div'>
						<label htmlFor='location' className='field-label'>
							Location
						</label>
						<input type='text' name='location' id='location' className='field-input' onChange={handleChange} required />
					</div>

					<div className='field-div'>
						<label htmlFor='joiningDate' className='field-label'>
							Joining Date
						</label>
						<input type='date' name='joiningDate' id='joiningDate' className='field-input' onChange={handleChange} required />
					</div>

					<div className='field-div'>
						<label htmlFor='reportingManager' className='field-label'>
							Reporting Manager
						</label>
						<input type='text' name='reportingManager' id='reportingManager' className='field-input' onChange={handleChange} required />
					</div>

					<div className='field-div'>
						<label htmlFor='reportsTo' className='field-label'>
							Reports To
						</label>
						<input type='text' name='reportsTo' id='reportsTo' className='field-input' onChange={handleChange} required />
					</div>
					<div style={{ padding: '0.5rem' }}>
						<button type='submit' className='submit-button'>
							Submit
						</button>
						<button
							className='close-button'
							onClick={() => {
								setOpen(false);
								document.body.style.overflow = 'visible';
							}}
						>
							Close
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AdminAddUser;
