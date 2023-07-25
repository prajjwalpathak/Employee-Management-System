import { useState } from 'react';
import { success } from '../../Utils/SuccessToast';
import { useNavigate } from 'react-router-dom';
import { updateUserProfileDetails } from '../../Services/UserServices/ProfileService';

const EditProfileDetailsModal = ({ setProfileModalOpen, profileModalData }) => {
	const [profileData, setProfileData] = useState({
		permanentAddress: profileModalData.permanentAddress,
		city: profileModalData.city,
		state: profileModalData.state,
		country: profileModalData.country,
		emergencyPhone: profileModalData.emergencyPhone
	});

	const navigate = useNavigate();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setProfileData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		updateUserProfileDetails(profileData)
			.then((data) => {
				setProfileModalOpen(false);
				navigate('/dashboard/getProfile');
				success('Profile details updated succesfully');
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
							<label className='field-label'>Permanent Address</label>
						</div>
						<div>
							<input className='field-input' type='text' name='permanentAddress' value={profileData?.permanentAddress} onChange={handleChange}></input>
						</div>
					</div>
					<div className='field-div'>
						<div>
							<label className='field-label'>City</label>
						</div>
						<div>
							<input className='field-input' type='text' name='city' value={profileData?.city} onChange={handleChange}></input>
						</div>
					</div>
					<div className='field-div'>
						<div>
							<label className='field-label'>State</label>
						</div>
						<div>
							<input className='field-input' type='text' name='state' value={profileData?.state} onChange={handleChange}></input>
						</div>
					</div>
					<div className='field-div'>
						<div>
							<label className='field-label'>Country</label>
						</div>
						<div>
							<input className='field-input' type='text' name='country' value={profileData?.country} onChange={handleChange}></input>
						</div>
					</div>
					<div className='field-div'>
						<div>
							<label className='field-label'>Emergency Phone</label>
						</div>
						<div>
							<input className='field-input' type='text' name='emergencyPhone' value={profileData?.emergencyPhone} onChange={handleChange}></input>
						</div>
					</div>

					<div style={{ padding: '0.5rem' }}>
						<button className='submit-button' type='submit'>
							Submit
						</button>
						<button
							className='close-button'
							onClick={() => {
								setProfileModalOpen(false);
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

export default EditProfileDetailsModal;
