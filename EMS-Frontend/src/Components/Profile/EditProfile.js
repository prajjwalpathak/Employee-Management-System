import React, { useState, useEffect, useContext } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Avatar from 'react-avatar-edit';
import 'primeicons/primeicons.css';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProfileFormData, updateUserProfileDetails } from '../../Services/UserServices/ProfileService';
import { fetchSkills, updateSkills } from '../../Services/UserServices/SkillsService';
import 'react-toastify/dist/ReactToastify.css';
import { success } from '../../Utils/SuccessToast';
import { Error } from '../../Utils/ErrorToast';

function EditProfile() {
	const navigate = useNavigate();
	const [imagecrop, setimagecrop] = useState(false);
	const [pview, setpview] = useState(false);
	const [poststate, setPostState] = useState(false);
	const [skillstate, setSkillState] = useState(false);
	const [profileformData, setProfileFormData] = useState([]);
	const [profileImageFormData, setProfileImageFormData] = useState([]);

	const [formData, setFormData] = useState({
		permanentAddress: '',
		city: '',
		state: '',
		country: '',
		emergencyPhone: ''
	});

	const [skillData, setSkillData] = useState({
		primarySkills: '',
		secondarySkills: '',
		certifications: ''
	});

	useEffect(() => {
		if (poststate) {
			ProfileFormData().then((data) => {
				updateUserProfileDetails(formData)
					.then((data) => {
						navigate('/dashboard/getProfile');
						success('Profile Updated Successfull');
					})
					.catch((e) => {
						Error('Could not Connect with Server');
					});
			});
		}
	}, [poststate, navigate, formData]);

	const handleSubmit = (event) => {
		event.preventDefault();
		setPostState(true);
	};
	const handleSkillSubmit = (event) => {
		event.preventDefault();
		fetchSkills().then((data) => {
			updateSkills(skillData)
				.then((data) => {
					navigate('/dashboard/getProfile');
					success('Skills Updated Successfully');
				})
				.catch((e) => {
					Error('Server Error');
				});
		});
	};

	const onClose = () => {
		setpview(null);
	};
	const onCrop = (view) => {
		setpview(view);
	};
	const savecropimage = () => {
		setFormData((prevState) => ({ ...prevState, profileImage: pview }));
		setimagecrop(false);
	};
	const profileclick = () => {
		setimagecrop(true);
	};

	//Profile Get Data
	useEffect(() => {
		ProfileFormData()
			.then((profiledata) => {
				setProfileFormData(profiledata);
				setFormData({
					permanentAddress: profiledata.profile.permanentAddress,
					city: profiledata.profile.city,
					state: profiledata.profile.state,
					country: profiledata.profile.country,
					emergencyPhone: profiledata.profile.emergencyPhone
				});
			})
			.catch((e) => {
				console.log(e.message);
			});
	}, []);

	useEffect(() => {
		fetchSkills().then((data) => {
			setSkillData({
				primarySkills: data.primarySkills,
				secondarySkills: data.secondarySkills,
				certifications: data.certifications
			});
		});
	}, []);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSkillChange = (event) => {
		const { name, value } = event.target;
		setSkillData((prevState) => ({ ...prevState, [name]: value }));
	};

	return (
		<>
			<div className='container'>
				<div className='formDetail-container'>
					<div className='Profile-upload'>
						<h4 className='personal-text'>Personal Details</h4>
					</div>
					<form onSubmit={handleSubmit}>
						<div className='d-flex flex-column '>
							{profileformData ? (
								<>
									<img className='profile-image' style={{ alignSelf: 'center' }} name='image' onClick={profileclick} src={formData.profileImage} alt='error_image' />
								</>
							) : (
								<></>
							)}

							<label htmlFor='' className='d-flex justify-content-center'>
								{profileformData ? profileformData?.profile?.name : ''}
							</label>
							<Dialog
								className=''
								style={{
									// position: "absolute",
									position: 'relative',
									zIndex: '1000',
									top: '0',
									right: '6%'
								}}
								visible={imagecrop}
								onHide={() => setimagecrop(false)}
							>
								<div className=' z-2 position-absolute p-5 card' style={{ top: '0', right: '25%' }}>
									<p className=''>Update Profile</p>
									<Avatar
										width={200}
										height={200}
										onCrop={onCrop}
										onClose={onClose}
										src={profileformData?.profile?.profileImage}
										sheadingColor={'#474649'}
										backgroundColor={'#00FFFF'}
									/>
									<div className=' w-12'>
										<div className=' w-12'>
											<Button className=' btn btn-primary mt-2' onClick={savecropimage} label='save' icon='pi pi-check' />
										</div>
									</div>
								</div>
							</Dialog>
						</div>
						<div className='row name-form'>
							<div className='col'>
								<label className='labels'>HRM ID</label>
								<input type='text' className='form-control' value={profileformData?.profile?.hrmid || 'HRM ID'} style={{ backgroundColor: '#EAEAEA' }} onChange={handleChange} />
							</div>
							<div className='col'>
								<label className='labels'>Name</label>
								<input type='text' className='form-control' value={profileformData?.profile?.name || 'Name'} style={{ backgroundColor: '#EAEAEA' }} onChange={handleChange} disabled />
							</div>
						</div>
						<div className='row name-form'>
							<div className='col'>
								<label className='labels'>Job Role</label>
								<input type='text' className='form-control' value={profileformData?.profile?.role || 'Job Role'} style={{ backgroundColor: '#EAEAEA' }} onChange={handleChange} />
							</div>
							<div className='col'>
								<label className='labels'>Reproting Manager</label>
								<input
									type='text'
									className='form-control'
									value={profileformData?.profile?.reportingManager || 'Reproting Manager'}
									style={{ backgroundColor: '#EAEAEA' }}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className='row name-form'>
							<div className='col'>
								<label className='labels'>Email ID</label>
								<input type='text' className='form-control' value={profileformData?.profile?.email || 'Email Id'} style={{ backgroundColor: '#EAEAEA' }} onChange={handleChange} />
							</div>
							<div className='col'>
								<label className='labels'>Joining Date</label>
								<input
									type='date'
									className='form-control'
									value={profileformData?.profile?.joiningDate || 'Joining Date'}
									style={{ backgroundColor: '#EAEAEA' }}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className='row name-form'>
							<div className='col'>
								<label className='labels'>Location</label>
								<input type='text' className='form-control' value={profileformData?.profile?.location || 'Location'} style={{ backgroundColor: '#EAEAEA' }} onChange={handleChange} />
							</div>
							<div className='col'>
								<label className='labels'>Phone</label>
								<input type='text' className='form-control' value={profileformData?.profile?.phone || 'Phone'} style={{ backgroundColor: '#EAEAEA' }} onChange={handleChange} />
							</div>
						</div>
						<div className='row name-form'>
							<div className='col'>
								<label className='labels'>Emergency Phone</label>
								<input
									type='text'
									name='emergencyPhone'
									className='form-control'
									value={formData.emergencyPhone || ''}
									placeholder='EmergencyPhone'
									style={{ backgroundColor: '#EAEAEA' }}
									onChange={handleChange}
								/>
							</div>
							<div className='col'>
								<label className='labels'>Permanent Address</label>
								<input
									type='text'
									name='permanentAddress'
									className='form-control'
									value={formData.permanentAddress || ''}
									placeholder='Permanent Address'
									style={{ backgroundColor: '#EAEAEA' }}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className='row name-form'>
							<div className='col'>
								<label className='labels'>City</label>
								<input type='text' name='city' className='form-control' value={formData.city || ''} placeholder='City' style={{ backgroundColor: '#EAEAEA' }} onChange={handleChange} />
							</div>

							<div className='col'>
								<label className='labels'>State</label>
								<input
									type='text'
									name='state'
									className='form-control'
									value={formData.state || ''}
									placeholder='State'
									style={{ backgroundColor: '#EAEAEA' }}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className='row name-form'>
							<div className='col'>
								<label className='labels'>Country</label>
								<input
									type='text'
									className='form-control'
									name='country'
									value={formData.country || ''}
									placeholder='Country'
									style={{ backgroundColor: '#EAEAEA' }}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className='name-form'>
							<button type='submit' className='btn btn-primary' style={{ width: '15%', height: '40px' }}>
								Submit
							</button>
						</div>
					</form>
					<div className='Profile-SKill mt-3'>
						<h4 className='personal-text'>My Skill</h4>
					</div>

					<form onSubmit={handleSkillSubmit}>
						<div className='row name-form'>
							<div className='d-flex flex-row'>
								<label className='p-1'>PrimarySkill</label>

								<input
									type='text'
									className='form-control p-1 pl'
									name='primarySkills'
									// value={profileformdata?.hrmid || 'Primary Skill'}
									placeholder='Primary Skill'
									style={{ backgroundColor: '#EAEAEA' }}
									value={skillData.primarySkills || ''}
									onChange={handleSkillChange}
								/>
							</div>
						</div>
						<div className='row name-form'>
							<div className='d-flex flex-row'>
								<label className='p-1'>SecondarySkill</label>
								<input
									type='text'
									name='secondarySkills'
									className='form-control p-1 sl'
									placeholder='Secondary Skill'
									style={{ backgroundColor: '#EAEAEA' }}
									value={skillData.secondarySkills || ''}
									onChange={handleSkillChange}
								/>
							</div>
						</div>
						<div className='row name-form'>
							<div className='d-flex flex-row'>
								<label className='p-1'>Certification</label>
								<input
									type='text'
									name='certifications'
									className='form-control p-1 certificate'
									placeholder='Certification'
									style={{ backgroundColor: '#EAEAEA' }}
									value={skillData.certifications || ''}
									onChange={handleSkillChange}
								/>
							</div>
						</div>

						<div className='name-form'>
							<button type='submit' className='btn btn-success' style={{ width: '15%', height: '40px' }}>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
export default EditProfile;
