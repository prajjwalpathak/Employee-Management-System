import { useState, useEffect } from 'react';
import { UpdateProjectDetails } from '../../Services/AdminServices/ProjectService';
import { success } from '../../Utils/SuccessToast';
import './AddProject.css';

const EditProject = ({ setEditOpen, currentProject, setRender }) => {
	const [formData, setFormData] = useState({
		projectName: '',
		completeBy: '',
		teamHead: '',
		teamMembers: '',
		department: '',
		status: ''
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

	const teamMemberEmails = (teamMembers) => {
		const emails = teamMembers.map((item) => {
			return item.email;
		});

		return emails.join(', ');
	};

	useEffect(() => {
		setFormData((prevData) => ({
			...prevData,
			...currentProject,
			teamMembers: teamMemberEmails(currentProject.teamMembers)
		}));
	}, []);

	useEffect(() => {
		if (isFormFilled) {
			UpdateProjectDetails(formData)
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
						<label htmlFor='projectName' className='field-label'>
							Project Name
						</label>
						<input type='text' name='projectName' id='projectName' onChange={handleChange} value={formData?.projectName} className='field-input' disabled />
					</div>

					<div className='field-div'>
						<label htmlFor='completeBy' className='field-label'>
							Complete By
						</label>
						<input type='date' name='completeBy' id='completeBy' value={formData?.completeBy} onChange={handleChange} className='field-input' required />
					</div>

					<div className='field-div'>
						<label htmlFor='teamHead' className='field-label'>
							Team Head
						</label>
						<input type='text' name='teamHead' id='teamHead' value={formData?.teamHead} onChange={handleChange} className='field-input' required />
					</div>
					<div className='field-div '>
						<label htmlFor='teamMembers' className='field-label'>
							Team Members
						</label>
						<input type='text' name='teamMembers' id='teamMembers' value={formData?.teamMembers} onChange={handleChange} className='field-input' required />
					</div>
					<div className='field-div '>
						<label htmlFor='Department' className='field-label'>
							Department
						</label>
						<input type='text' name='department' id='Department' onChange={handleChange} value={formData?.department} className='field-input' required />
					</div>
					<div className='field-div '>
						<label htmlFor='status' className='field-label'>
							Status
						</label>
						<input type='text' name='status' id='status' onChange={handleChange} value={formData?.status} className='field-input' required />
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

export default EditProject;
