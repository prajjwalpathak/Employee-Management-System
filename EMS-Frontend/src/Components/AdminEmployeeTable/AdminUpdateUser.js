import { useState, useEffect } from 'react';
import { UpdateUserDetails } from '../../Services/AdminServices/AdminUserService';
import { success } from '../../Utils/SuccessToast';
import './AddUser.css';

const AdminUpdateUser = ({ setEditOpen, currentUserId, setRender }) => {
	const [formData, setFormData] = useState({
		userId: '',
		role: '',
		department: '',
		location: ''
	});

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
		setFormData((prevData) => ({ ...prevData, ...currentUserId }));
	}, []);

	useEffect(() => {
		if (isFormFilled) {
			UpdateUserDetails(formData)
				.then((data) => {
					success(data.message);
					setEditOpen(false);
					document.body.style.overflow = 'visible';
					setRender((prev) => !prev);
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
						<label htmlFor='role' className='field-label'>
							Role
						</label>
						<input type='text' name='role' id='role' className='field-input' value={formData?.role} onChange={handleChange} required />
					</div>

					<div className='field-div'>
						<label htmlFor='Department' className='field-label'>
							Department
						</label>
						<input type='text' name='department' id='Department' value={formData?.department} className='field-input' onChange={handleChange} required />
					</div>

					<div className='field-div'>
						<label htmlFor='location' className='field-label'>
							Location
						</label>
						<input type='text' name='location' id='location' value={formData?.location} className='field-input' onChange={handleChange} required />
					</div>

					<div style={{ padding: '0.5rem' }}>
						<button type='submit' className='submit-button'>
							Submit
						</button>
						<button
							className='close-button'
							onClick={() => {
								setEditOpen(false);
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

export default AdminUpdateUser;
