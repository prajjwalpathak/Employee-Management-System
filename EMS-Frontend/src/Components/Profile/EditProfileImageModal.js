import { useState } from 'react';
import { success } from '../../Utils/SuccessToast';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Avatar from 'react-avatar-edit';
import { updateUserProfileImage } from '../../Services/UserServices/ProfileService';

const EditProfileImageModal = ({ setProfileImageModalOpen, profileImageModalData }) => {
	const [profileImageData, setProfileImageData] = useState({
		profileImage: profileImageModalData.profileImage
	});

	const navigate = useNavigate();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setProfileImageData((prevState) => ({ ...prevState, [name]: value }));
	};

	const [pview, setpview] = useState(false);
	const [imagecrop, setimagecrop] = useState(false);

	const onClose = () => {
		setpview(null);
	};
	const onCrop = (view) => {
		setpview(view);
	};
	const savecropimage = () => {
		setProfileImageData((prevState) => ({ ...prevState, profileImage: pview }));
		setimagecrop(false);
	};
	const profileclick = () => {
		setimagecrop(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		updateUserProfileImage(profileImageData)
			.then((data) => {
				setProfileImageModalOpen(false);
				navigate('/dashboard/getProfile');
				success('Profile Image updated succesfully');
			})
			.catch((e) => {
				Error('Server Error');
			});
	};

	return (
		<div className='modal-container-div'>
			<div className='modal-div'>
				<form className='form-main-container' onSubmit={handleSubmit}>
					<div>
						<Avatar
							width={300}
							height={300}
							imageWidth={300}
							onCrop={onCrop}
							onClose={onClose}
							src={profileImageData?.profileImage}
							sheadingColor={'#FFFFFF'}
							backgroundColor={'#00FFFF'}
						/>

						<button className='submit-button' onClick={savecropimage}>
							Submit
						</button>
						<button
							className='close-button'
							onClick={() => {
								setProfileImageModalOpen(false);
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

export default EditProfileImageModal;
