import AdminEmployeeTable from '../AdminEmployeeTable/AdminEmployeeTable';
import AdminProjectTable from '../AdminProjectTable/AdminProjectTable';

function AdminHome() {
	return (
		<>
			<div className='content-inner'>
				<div className='row gx-3' style={{ padding: '0 1rem', marginTop: '1rem' }}>
					<AdminEmployeeTable />
					<AdminProjectTable />
				</div>
			</div>
		</>
	);
}

export default AdminHome;
