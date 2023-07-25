import celebalLogo from '../../Assests/Celebal.png';
import { NavLink } from 'react-router-dom';

function AdminSidebar() {
	return (
		<div className='left-sidebar'>
			<div className='left-sidebar-logo-div'>
				<img className='left-sidebar-logo' src={celebalLogo} alt='celebal' />
			</div>
			<div className='left-sidebar-tabs'>
				<NavLink end to='/admindashboard' className={(navData) => (navData.isActive ? 'active-tab' : 'inactive-tab')}>
					<div className='left-sidebar-tab'>
						<span style={{ marginRight: '1rem' }}>
							<i className='bi bi-grid' style={{ fontSize: '1.2rem' }}></i>
						</span>
						<span>Dashboard</span>
					</div>
				</NavLink>

				<NavLink to='requests' className={(navData) => (navData.isActive ? 'active-tab' : 'inactive-tab')}>
					<div className='left-sidebar-tab'>
						<span style={{ marginRight: '1rem' }}>
							<i className='bi bi-wallet2' style={{ fontSize: '1.2rem' }}></i>
						</span>
						<span>Requests</span>
					</div>
				</NavLink>
				<NavLink to='timesheets' className={(navData) => (navData.isActive ? 'active-tab' : 'inactive-tab')}>
					<div className='left-sidebar-tab'>
						<span style={{ marginRight: '1rem' }}>
							<i className='bi bi-calendar-check' style={{ fontSize: '1.2rem' }}></i>
						</span>
						<span>Timesheets</span>
					</div>
				</NavLink>
			</div>
		</div>
	);
}

export default AdminSidebar;
