import { useState, useEffect } from 'react';
import { addProject } from '../../Services/AdminServices/ProjectService';
import { success } from '../../Utils/SuccessToast';
import './AddProject.css';

const AddProject = ({ setAddOpen, setRender }) => {
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
			addProject(formData)
				.then((data) => {
					success(data.message);
					setAddOpen(false);
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
						<input type='text' name='projectName' id='projectName' className='field-input' onChange={handleChange} required />
					</div>
					<div className='field-div'>
						<label htmlFor='clientName' className='field-label'>
							Client Name
						</label>
						<input type='text' name='clientName' id='clientName' onChange={handleChange} className='field-input' required />
					</div>

					<div className='field-div'>
						<label htmlFor='assignedOn' className='field-label'>
							Assigned On
						</label>
						<input type='date' name='assignedOn' id='assignedOn' onChange={handleChange} className='field-input' required />
					</div>

					<div className='field-div'>
						<label htmlFor='completeBy' className='field-label'>
							Complete By
						</label>
						<input type='date' name='completeBy' id='completeBy' onChange={handleChange} className='field-input' required />
					</div>

					<div className='field-div'>
						<label htmlFor='teamHead' className='field-label'>
							Team Head
						</label>
						<input type='text' name='teamHead' id='teamHead' onChange={handleChange} className='field-input' placeholder='first.last@celebaltech.com' required />
					</div>
					<div className='field-div'>
						<label htmlFor='teamMembers' className='field-label'>
							Team Members
						</label>
						<input type='text' name='teamMembers' id='teamMembers' onChange={handleChange} className='field-input' placeholder='first.last@celebaltech.com, ...' required />
					</div>
					<div className='field-div'>
						<label htmlFor='Department' className='field-label'>
							Department
						</label>
						<input type='text' name='department' id='Department' onChange={handleChange} className='field-input' required />
					</div>
					<div style={{ padding: '0.5rem' }}>
						<button type='submit' className='submit-button'>
							Submit
						</button>
						<button
							className='close-button'
							onClick={() => {
								setAddOpen(false);
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

export default AddProject;
