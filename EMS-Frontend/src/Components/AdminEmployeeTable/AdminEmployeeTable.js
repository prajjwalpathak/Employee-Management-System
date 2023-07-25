import { useEffect, useState } from 'react';
import { getUsers } from '../../Services/AdminServices/UserService';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';
import AdminAddUser from './AdminUserAdd';
import AdminUpdateUser from './AdminUpdateUser';
import NoRecord from '../NoRecord/NoRecord';

function AdminEmployeeTable() {
	const navigate = useNavigate();
	const [EmployeeData, setEmployeeData] = useState([]);
	const [curentPage, setCurrentPage] = useState(1);
	const [isOpen, setOpen] = useState(false);
	const [isEditOpen, setEditOpen] = useState(false);
	const [isRender, setRender] = useState(false);
	const recordPerPage = 6;
	const lastIndex = curentPage * recordPerPage;
	const firstIndex = lastIndex - recordPerPage;
	const records = EmployeeData.slice(firstIndex, lastIndex);
	const [currentUserId, setCurrentUserId] = useState({
		userId: '',
		role: '',
		department: '',
		location: ''
	});

	useEffect(() => {
		getUsers()
			.then((data) => {
				setEmployeeData(data);
			})
			.catch((e) => {
				console.log(e.message);
			});
	}, [isRender]);

	return (
		<>
			{isOpen && <AdminAddUser setOpen={setOpen} />}
			{isEditOpen && <AdminUpdateUser setEditOpen={setEditOpen} currentUserId={currentUserId} setRender={setRender} />}
			<section>
				<div className='table-heading' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<div>
						<h1 className='table-title'>Employees</h1>
					</div>
					<button
						className='add-button'
						onClick={() => {
							setOpen(!isOpen);
							document.body.style.overflow = 'hidden';
						}}
					>
						Add Employee
					</button>
				</div>
				<div className='table-content'>
					<table className='table-content-table'>
						<thead className='table-content-table-head'>
							<tr className='table-head-row'>
								<th className='table-head'>Employee</th>
								<th className='table-head'>HRMID</th>
								<th className='table-head'>Department</th>
								<th className='table-head text-center'>Role</th>
								<th className='table-head text-center'>Location</th>
								<th className='table-head text-center'>Status</th>
								<th className='table-head text-center'>Action</th>
							</tr>
						</thead>
						<tbody>
							{records ? (
								records.map((record, index) => (
									<tr key={index}>
										<td
											className='table-data'
											onClick={() => {
												navigate({
													pathname: 'user-profile',
													search: `?userId=${record.id}`
												});
											}}
										>
											{record.name}
										</td>
										<td className='table-data'>{record.hrmid}</td>
										<td className='table-data'>{record.department}</td>
										<td className='table-data text-center'>{record.role}</td>
										<td className='table-data text-center'>{record.location}</td>
										<td className='table-data text-center'>{record.status === null ? 'not checked-in' : record.status}</td>

										<td className='table-data text-center '>
											<i
												className='bi bi-pencil-square icon-size icon-center'
												style={{ cursor: 'pointer' }}
												onClick={() => {
													setCurrentUserId({
														userId: record.id,
														role: record.role,
														department: record.department,
														location: record.location
													});
													document.body.style.overflow = 'hidden';
													setEditOpen(!isEditOpen);
												}}
											></i>
										</td>
									</tr>
								))
							) : (
								<>
									<tr>
										<td colSpan='8'>
											<NoRecord />
										</td>
									</tr>
								</>
							)}
						</tbody>
					</table>
					{records?.length > recordPerPage && (
						<div className='d-flex justify-content-center align-items-center py-3'>
							<Pagination
								count={Math.ceil(records.length / recordPerPage)}
								style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
								onChange={(event, value) => {
									setCurrentPage(value);
								}}
							/>
						</div>
					)}
				</div>
			</section>
		</>
	);
}
export default AdminEmployeeTable;
