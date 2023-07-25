import { useState } from 'react';
import { success } from '../../Utils/SuccessToast';
import { useNavigate } from 'react-router-dom';
import { updateSkills } from '../../Services/UserServices/SkillsService';

const EditSkillsModal = ({ setSkillsModalOpen, skillsModalData }) => {
	const [skillsData, setskillsData] = useState({
		primarySkills: skillsModalData.primarySkills,
		secondarySkills: skillsModalData.secondarySkills,
		certifications: skillsModalData.certifications
	});

	const navigate = useNavigate();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setskillsData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		updateSkills(skillsData)
			.then((data) => {
				setSkillsModalOpen(false);
				navigate('/dashboard/getProfile');
				success('Skills updated succesfully');
			})
			.catch((e) => {
				Error('Server Error');
			});
	};

	return (
		<div className='modal-container-div'>
			<div className='modal-div'>
				<form className='form-main-container' onSubmit={handleSubmit}>
					<div className='field-div'>
						<div>
							<label className='field-label'>Primary Skills</label>
						</div>
						<div>
							<input className='field-input' type='text' name='primarySkills' value={skillsData?.primarySkills} onChange={handleChange}></input>
						</div>
					</div>
					<div className='field-div'>
						<div>
							<label className='field-label'>Secondary Skills</label>
						</div>
						<div>
							<input className='field-input' type='text' name='secondarySkills' value={skillsData?.secondarySkills} onChange={handleChange}></input>
						</div>
					</div>
					<div className='field-div'>
						<div>
							<label className='field-label'>Certifications</label>
						</div>
						<div>
							<input className='field-input' type='text' name='certifications' value={skillsData?.certifications} onChange={handleChange}></input>
						</div>
					</div>
					<div style={{ padding: '0.5rem' }}>
						<button className='submit-button' type='submit'>
							Submit
						</button>
						<button
							className='close-button'
							onClick={() => {
								setSkillsModalOpen(false);
							}}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditSkillsModal;
