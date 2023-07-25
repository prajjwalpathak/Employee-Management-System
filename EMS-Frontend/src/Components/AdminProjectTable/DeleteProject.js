import { useState, useEffect } from 'react';
import { DeleteProjectData } from '../../Services/AdminServices/ProjectService';
import { success } from '../../Utils/SuccessToast';
import './AddProject.css';

const DeleteProject = ({ setDeleteOpen, currentProject, setRender }) => {
	const [formData, setFormData] = useState({ projectId: '' });
	const [isFormFilled, setFormFilled] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		setFormFilled((prev) => !prev);
	};

	useEffect(() => {
		setFormData({
			projectId: currentProject.id
		});
	}, []);

	useEffect(() => {
		if (isFormFilled) {
			DeleteProjectData(formData)
				.then((data) => {
					success(data.message);
					setDeleteOpen(false);
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
						<label className='field-label' style={{ textAlign: 'justify' }}>
							Are you sure you want to delete this project?
						</label>
					</div>
					<div style={{ padding: '0.5rem' }}>
						<button type='submit' className='close-button' style={{ backgroundColor: '#e95b6d', color: 'white' }}>
							Delete
						</button>
						<button
							className='close-button'
							onClick={() => {
								setDeleteOpen(false);
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

export default DeleteProject;
