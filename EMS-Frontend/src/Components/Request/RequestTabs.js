import { NavLink } from 'react-router-dom';

const RequestTabs = () => {
	return (
		<nav className='request-tabs-nav-div'>
			<span style={{ marginBottom: '1rem', fontWeight: 'bold', color: 'rgb(80, 80, 80)', padding: '0 0.3rem' }}>Requests</span>
			<NavLink
				className={(navData) => (navData.isActive ? 'active-request-tab text-white' : 'inactive-request-tab text-black')}
				to='/dashboard/getRequest'
				style={{ textDecoration: 'none', marginBottom: '0.8rem', fontSize: '0.9rem', padding: '0.3rem', borderRadius: '2px', color: 'black' }}
			>
				View
			</NavLink>
			<NavLink
				className={(navData) => (navData.isActive ? 'active-request-tab text-white' : 'inactive-request-tab text-black')}
				to='/dashboard/viewRequest'
				style={{ textDecoration: 'none', marginBottom: '0.8rem', fontSize: '0.9rem', padding: '0.3rem', borderRadius: '2px', color: 'black' }}
			>
				Manage
			</NavLink>
			<NavLink
				className={(navData) => (navData.isActive ? 'active-request-tab text-white' : 'inactive-request-tab text-black')}
				to='/dashboard/leave'
				style={{ textDecoration: 'none', fontSize: '0.9rem', padding: '0.3rem', borderRadius: '2px', color: 'black' }}
			>
				Add
			</NavLink>
		</nav>
	);
};

export default RequestTabs;
