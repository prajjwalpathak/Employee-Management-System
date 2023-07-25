import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'primeicons/primeicons.css';
import './AdminUserProfile.css';
import { adminGetUserId } from '../../Services/AdminServices/SearchService';
import { getSkills } from '../../Services/AdminServices/ProfileService';

function AdminUserProfile() {
	const [searchdata, setsearchdata] = useState({});
	const [skilldata, setSkillData] = useState({});
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			adminGetUserId(id)
				.then((data) => {
					setsearchdata(data);
					console.log(data);
				})
				.catch((e) => {
					console.log(e.message);
					setsearchdata({});
				});
		}

		return () => {
			setsearchdata({});
		};
	}, [id]);

	useEffect(() => {
		if (id) {
			getSkills(id).then((data) => {
				setSkillData(data);
			});
		}
	}, []);

	return (
		<>
			<div className='profile-container'>
				<div className='wallpaper-div'>
					<div className='wallpaper-profile-image-div'>
						<img className='profile-image' name='image' src={searchdata?.profile?.profileImage} alt='' />
					</div>
					<div className='wallpaper-profile-info-div'>
						<ul className='wallpaper-profile-info'>
							<li>
								{searchdata?.profile?.hrmid || ''} - {searchdata?.profile?.name || ''}
							</li>
							<li>{searchdata?.profile?.role || ''}</li>
							<li>{searchdata?.profile?.department || ''}</li>
							<li>{searchdata?.profile?.email || ''}</li>
						</ul>
					</div>
				</div>

				<div className='profile-options-div'></div>
				<div className='profile-details-div'>
					<div className='first-column'>
						<div className='about-me-div profile-details-div-common'>
							<div className='inner-details-title-div'>
								<div className='notch'></div>
								<span className='inner-details-title'>About Me</span>
							</div>
							<div className='profile-details-content-div'>
								<div className='inner-details-div'>
									<div className='profile-detail-field-div'>
										<span style={{ padding: '1rem', fontSize: '1.4rem' }}>
											<i className='bi bi-diagram-3'></i>
										</span>
										<span style={{ padding: '1rem' }}>{searchdata?.profile?.department || ''}</span>
									</div>
									<div className='profile-detail-field-div'>
										<span style={{ padding: '1rem', fontSize: '1.4rem' }}>
											<i className='bi bi-people'></i>
										</span>
										<span style={{ padding: '1rem' }}>{searchdata?.profile?.role || ''}</span>
									</div>
								</div>
								<div className='inner-details-div'>
									<div className='profile-detail-field-div'>
										<span style={{ padding: '1rem', fontSize: '1.4rem' }}>
											<i className='bi bi-phone'></i>
										</span>
										<span style={{ padding: '1rem' }}>+91 {searchdata?.profile?.phone || ''}</span>
									</div>
									<div className='profile-detail-field-div'>
										<span style={{ padding: '1rem', fontSize: '1.4rem' }}>
											<i className='bi bi-geo-alt'></i>
										</span>
										<span style={{ padding: '1rem' }}>{searchdata?.profile?.location || ''}</span>
									</div>
								</div>
							</div>
						</div>
						<div className='personal-div profile-details-div-common'>
							<div className='inner-details-title-div'>
								<div className='notch'></div>
								<span className='inner-details-title'>Personal</span>
							</div>
							<div className='profile-details-content-div'>
								<div className='profile-detail-field-div'>
									<span className='inner-detail-field-title'>Permanent Address</span>
									<span className='inner-detail-field-value'>{searchdata?.profile?.permanentAddress || ''}</span>
								</div>
								<div className='profile-detail-field-div'>
									<span className='inner-detail-field-title'>City</span>
									<span className='inner-detail-field-value'>{searchdata?.profile?.city || ''}</span>
								</div>
								<div className='profile-detail-field-div'>
									<span className='inner-detail-field-title'>State</span>
									<span className='inner-detail-field-value'>{searchdata?.profile?.state || ''}</span>
								</div>
								<div className='profile-detail-field-div'>
									<span className='inner-detail-field-title'>Country</span>
									<span className='inner-detail-field-value'>{searchdata?.profile?.country || ''}</span>
								</div>
								<div className='profile-detail-field-div'>
									<span className='inner-detail-field-title'>Emergency Phone</span>
									<span className='inner-detail-field-value'>+91 {searchdata?.profile?.emergencyPhone || ''}</span>
								</div>
							</div>
						</div>
						<div className='skills-div profile-details-div-common'>
							<div className='inner-details-title-div'>
								<div className='notch'></div>
								<span className='inner-details-title'>Skills</span>
							</div>
							<div className='profile-details-content-div'>
								<div className='profile-detail-field-div'>
									<span className='inner-detail-field-title'>Primary Skills</span>
									<span className='inner-detail-field-value'>{skilldata?.primarySkills || ''}</span>
								</div>
								<div className='profile-detail-field-div'>
									<span className='inner-detail-field-title'>Secondary Skills</span>
									<span className='inner-detail-field-value'>{skilldata?.secondarySkills || ''}</span>
								</div>
								<div className='profile-detail-field-div'>
									<span className='inner-detail-field-title'>Certifications</span>
									<span className='inner-detail-field-value'>{skilldata?.certifications || ''}</span>
								</div>
							</div>
						</div>
					</div>
					<div className='second-column'>
						{searchdata?.reportingManager ? (
							<div className='reporting-to-div  profile-details-div-common'>
								<div className='inner-details-title-div'>
									<div className='notch'></div>
									<span className='inner-details-title'>Reporting To</span>
								</div>
								<div className='profile-details-content-div'>
									<div className='profile-details-card-div'>
										<div className='profile-details-card-image-div'>
											<img className='profile-image-mini' name='image' src={searchdata?.reportingManager?.profileImage} alt='' />
										</div>

										<div className='profile-details-card-content-div'>
											<div>
												<span style={{ fontSize: '0.9rem' }}>
													{searchdata?.reportingManager?.hrmid || ''}
													<span> - </span>
												</span>
												<span
													style={{
														fontWeight: 'bold',
														fontSize: '0.9rem'
													}}
												>
													{searchdata?.reportingManager?.name || ''}
												</span>
											</div>
											<div>
												<span>
													{searchdata?.reportingManager?.role || ''}
													<span> - </span>
												</span>
												<span>{searchdata?.reportingManager?.department || ''}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						) : (
							<></>
						)}

						{searchdata?.subordinates ? (
							<div className='direct-reports-div profile-details-div-common'>
								<div className='inner-details-title-div'>
									<div className='notch'></div>
									<span className='inner-details-title'>Direct Reports</span>
								</div>
								<div className='profile-details-content-div'>
									{searchdata?.subordinates.map((subordinate) => {
										return (
											<div className='profile-details-card-div' key={subordinate.hrmid}>
												<div className='profile-details-card-image-div'>
													<img className='profile-image-mini' name='image' src={subordinate?.profileImage} alt='' />
												</div>
												<div className='profile-details-card-content-div'>
													<div>
														<span style={{ fontSize: '0.9rem' }}>
															{subordinate?.hrmid || ''}
															<span> - </span>
														</span>
														<span
															style={{
																fontWeight: 'bold',
																fontSize: '0.9rem'
															}}
														>
															{subordinate?.name || ''}
														</span>
													</div>
													<div>
														<span>
															{subordinate?.role || ''}
															<span> - </span>
														</span>
														<span>{subordinate?.department || ''}</span>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						) : (
							<></>
						)}

						<div className='work-div profile-details-div-common'>
							<div className='inner-details-title-div'>
								<div className='notch'></div>
								<span className='inner-details-title'>Work</span>
							</div>
							<div className='profile-details-content-div'>
								<div className='profile-detail-field-div'>
									<span className='inner-detail-field-title'>Employee ID</span>
									<span className='inner-detail-field-value'>{searchdata?.profile?.hrmid || ''}</span>
								</div>
								<div className='profile-detail-field-div'>
									<span className='inner-detail-field-title'>Email</span>
									<span className='inner-detail-field-value'>{searchdata?.profile?.email || ''}</span>
								</div>
								<div className='profile-detail-field-div'>
									<span className='inner-detail-field-title'>Role</span>
									<span className='inner-detail-field-value'>{searchdata?.profile?.role || ''}</span>
								</div>
								<div className='profile-detail-field-div'>
									<span className='inner-detail-field-title'>Department</span>
									<span className='inner-detail-field-value'>{searchdata?.profile?.department || ''}</span>
								</div>
								<div className='profile-detail-field-div'>
									<span className='inner-detail-field-title'>Reporting Manager</span>
									<span className='inner-detail-field-value'>{searchdata?.profile?.reportingManager || ''}</span>
								</div>
								<div className='profile-detail-field-div'>
									<span className='inner-detail-field-title'>Date Of Joining</span>
									<span className='inner-detail-field-value'>{searchdata?.profile?.joiningDate || ''}</span>
								</div>
								<div className='profile-detail-field-div'>
									<span className='inner-detail-field-title'>Office Location</span>
									<span className='inner-detail-field-value'>{searchdata?.profile?.location || ''}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default AdminUserProfile;
