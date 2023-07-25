import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProjectDetail } from '../../Services/AdminServices/ProjectService';
import 'primeicons/primeicons.css';
import './AdminProject.css';

const AdminProject = () => {
	const [searchParams] = useSearchParams();
	const projectId = searchParams.get('projectId');
	const [projectData, setProjectData] = useState({});

	useEffect(() => {
		getProjectDetail(projectId)
			.then((data) => {
				setProjectData(data);
			})
			.catch((e) => {
				console.log(e.message);
				setProjectData({});
			});
	}, [projectId]);

	return (
		<>
			<div className='project-div'>
				<div className='project-heading-div'>
					<span className='project-heading'>{projectData?.projectName || ''}</span>
				</div>

				<div className='project-details-div'>
					<div className='first-column-div'>
						{projectData?.teamHead ? (
							<div className='team-head-div  project-details-div-common'>
								<div className='inner-details-title-div'>
									<div className='notch'></div>
									<span className='inner-details-title'>Team Head</span>
								</div>
								<div className='project-details-content'>
									<div className='project-details-card-div'>
										<div className='project-details-card-image-div'>
											<img className='project-image-mini' name='image' src={projectData?.teamHead?.profileImage} alt='' />
										</div>

										<div className='project-details-card-content-div'>
											<div>
												<span style={{ fontSize: '0.9rem' }}>
													{projectData?.teamHead?.hrmid || ''}
													<span> - </span>
												</span>
												<span
													style={{
														fontWeight: 'bold',
														fontSize: '0.9rem'
													}}
												>
													{projectData?.teamHead?.name || ''}
												</span>
											</div>
											<div>
												<span>
													{projectData?.teamHead?.role || ''}
													<span> - </span>
												</span>
												<span>{projectData?.teamHead?.department || ''}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						) : (
							<></>
						)}
						<div className='project-content-div project-details-div-common'>
							<div className='inner-details-title-div'>
								<div className='notch'></div>
								<span className='inner-details-title'>Project Details</span>
							</div>
							<div className='project-details-content'>
								<div className='inner-details-div'>
									<div className='project-detail-field-div'>
										<span style={{ padding: '1rem', fontSize: '1.4rem' }}>
											<i className='bi bi-database'></i>
										</span>
										<span style={{ padding: '1rem' }}>{projectData?.projectName || ''}</span>
									</div>
									<div className='project-detail-field-div'>
										<span style={{ padding: '1rem', fontSize: '1.4rem' }}>
											<i className='bi bi-building'></i>
										</span>
										<span style={{ padding: '1rem' }}>{projectData?.clientName || ''}</span>
									</div>
								</div>
								<div className='inner-details-div'>
									<div className='project-detail-field-div'>
										<span style={{ padding: '1rem', fontSize: '1.4rem' }}>
											<i className='bi bi-diagram-3'></i>
										</span>
										<span style={{ padding: '1rem' }}>{projectData?.department || ''}</span>
									</div>
									<div className='project-detail-field-div'>
										<span style={{ padding: '1rem', fontSize: '1.4rem' }}>
											<i className='bi bi-clipboard-data'></i>
										</span>
										<span style={{ padding: '1rem' }}>{projectData?.status || ''}</span>
									</div>
								</div>
								<div className='inner-details-div'>
									<div className='project-detail-field-div'>
										<span style={{ padding: '1rem', fontSize: '1.4rem' }}>
											<i className='bi bi-calendar-event'></i>
										</span>
										<span style={{ padding: '1rem' }}>Assigned On: {projectData?.assignedOn || ''}</span>
									</div>
								</div>
								<div className='inner-details-div'>
									<div className='project-detail-field-div'>
										<span style={{ padding: '1rem', fontSize: '1.4rem' }}>
											<i className='bi bi-calendar-event'></i>
										</span>
										<span style={{ padding: '1rem' }}>Complete By: {projectData?.completeBy || ''}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='second-column-div'>
						{projectData?.teamMembers ? (
							<div className='team-members project-details-div-common'>
								<div className='inner-details-title-div'>
									<div className='notch'></div>
									<span className='inner-details-title'>Team Members</span>
								</div>
								<div className='project-details-content'>
									{projectData?.teamMembers.map((teamMember) => {
										return (
											<div className='project-details-card-div' key={teamMember.hrmid}>
												<div className='project-details-card-image-div'>
													<img className='project-image-mini' name='image' src={teamMember?.profileImage} alt='' />
												</div>
												<div className='project-details-card-content-div'>
													<div>
														<span style={{ fontSize: '0.9rem' }}>
															{teamMember?.hrmid || ''}
															<span> - </span>
														</span>
														<span
															style={{
																fontWeight: 'bold',
																fontSize: '0.9rem'
															}}
														>
															{teamMember?.name || ''}
														</span>
													</div>
													<div>
														<span>
															{teamMember?.role || ''}
															<span> - </span>
														</span>
														<span>{teamMember?.department || ''}</span>
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
					</div>
				</div>
			</div>
		</>
	);
};
export default AdminProject;
