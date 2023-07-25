import React, { useState, useEffect } from 'react';
import { getProjects } from '../../Services/AdminServices/ProjectService';
import { useNavigate } from 'react-router-dom/dist';
import AddProject from './AddProject';
import EditProject from './EditProject';
import DeleteProject from './DeleteProject';
import Profile from '../../Assests/Profile.png';
import NoRecord from '../NoRecord/NoRecord';

const AdminProjectTable = () => {
	const navigate = useNavigate();
	const [projects, setProject] = useState(null);
	const [isAddOpen, setAddOpen] = useState(false);
	const [isEditOpen, setEditOpen] = useState(false);
	const [isDelete, setDeleteOpen] = useState(false);
	const [isRender, setRender] = useState(false);
	const [currentProject, setCurrentProject] = useState({
		id: '',
		projectName: '',
		completeBy: '',
		teamHead: '',
		teamMembers: '',
		department: '',
		status: ''
	});

	useEffect(() => {
		getProjects()
			.then((data) => {
				setProject(data);
			})
			.catch((e) => {
				console.log(e.message);
				setProject(null);
			});
	}, [isRender, isDelete]);

	return (
		<>
			{isAddOpen && <AddProject setAddOpen={setAddOpen} setRender={setRender} />}
			{isEditOpen && <EditProject setEditOpen={setEditOpen} currentProject={currentProject} setRender={setRender} />}
			{isDelete && <DeleteProject setDeleteOpen={setDeleteOpen} currentProject={currentProject} setRende={setRender} />}
			<section style={{ marginTop: '4rem' }}>
				<div className='table-heading' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<div>
						<h1 className='table-title'>Projects</h1>
					</div>
					<button
						className='add-button'
						onClick={() => {
							setAddOpen(!isAddOpen);
							document.body.style.overflow = 'hidden';
						}}
					>
						Add Project
					</button>
				</div>
				<div className='project-table-content'>
					<table className='project-table-content-table'>
						<thead className='project-table-content-head'>
							<tr className='table-row'>
								<th className='table-head'>Project Name</th>
								<th className='table-head text-center'>Assigned on</th>
								<th className='table-head text-center'>Complete By</th>
								<th className='table-head text-center'>Status</th>
								<th className='table-head'>Team</th>
								<th className='table-head'>Team Head</th>
								<th className='table-head text-center'>Action</th>
							</tr>
						</thead>
						<tbody>
							{projects ? (
								projects.map((project, index) => (
									<tr key={index} className='project-table-row-data'>
										<td
											className='table-data'
											style={{ cursor: 'pointer' }}
											onClick={() => {
												navigate({
													pathname: 'project-detail',
													search: `?projectId=${project.id}`
												});
											}}
										>
											{project.projectName}
										</td>
										<td className='table-data text-center'>{project?.assignedOn}</td>
										<td className='table-data text-center'>{project?.completeBy}</td>
										<td className='table-data color-blue'>
											<div className='status'>
												<div className='status-progress-dot'></div>
												<span>{project.status}</span>
											</div>
										</td>
										<td className='table-data'>
											{project?.teamMembers.length === 1 ? (
												<div className='image-overlap'>
													<span>
														<img className='img-1' src={project?.teamMembers[0]?.profileImage ? project?.teamMembers[0]?.profileImage : Profile} alt='team-member' />
													</span>
												</div>
											) : (
												<>
													{project?.teamMembers.length === 2 ? (
														<div className='image-overlap'>
															<span>
																<img
																	className='img-1'
																	src={project?.teamMembers[0]?.profileImage ? project?.teamMembers[0]?.profileImage : Profile}
																	alt='team-member'
																/>
															</span>
															<span>
																<img
																	className='img-2'
																	src={project?.teamMembers[1]?.profileImage ? project?.teamMembers[1]?.profileImage : Profile}
																	alt='team-member'
																/>
															</span>
														</div>
													) : (
														<>
															{project?.teamMembers.length > 2 ? (
																<div className='image-overlap'>
																	<span>
																		<img
																			className='img-1'
																			src={project?.teamMembers[0]?.profileImage ? project?.teamMembers[0]?.profileImage : Profile}
																			alt='team-member'
																		/>
																	</span>
																	<span>
																		<img
																			className='img-2'
																			src={project?.teamMembers[1]?.profileImage ? project?.teamMembers[1]?.profileImage : Profile}
																			alt='team-member'
																		/>
																	</span>
																	<span>
																		<div className='img-3'>
																			<span className='img-3-number'>+{project?.teamMembers.length - 2}</span>
																		</div>
																	</span>
																</div>
															) : (
																<></>
															)}
														</>
													)}
												</>
											)}
										</td>
										<td className='table-data'>
											<div>
												<span>
													<img className='team-head-img' src={project?.teamHead?.profileImage ? project?.teamHead?.profileImage : Profile} alt='team-head' />
												</span>
												<span className='team-head-name'>{project?.teamHead?.name}</span>
											</div>
										</td>
										<td className='table-data'>
											<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
												<i
													className='bi bi-pencil-square icon-size icon-center'
													style={{ cursor: 'pointer' }}
													onClick={() => {
														setCurrentProject({
															projectName: project.projectName,
															completeBy: project.completeBy,
															teamHead: project.teamHead.email,
															teamMembers: project.teamMembers,
															department: project.department,
															status: project.status
														});
														setEditOpen(true);
														document.body.style.overflow = 'hidden';
													}}
												></i>
												<i
													className='bi bi-trash cancel-icon icon-size icon-center'
													style={{ cursor: 'pointer' }}
													onClick={() => {
														setCurrentProject({
															id: project.id
														});
														setDeleteOpen(true);
														document.body.style.overflow = 'hidden';
													}}
												></i>
											</div>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan='6'>
										<NoRecord />
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</section>
		</>
	);
};

export default AdminProjectTable;
