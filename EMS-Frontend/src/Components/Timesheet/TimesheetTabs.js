import React from 'react';
import { NavLink } from 'react-router-dom';

function TimesheetTabs() {
	return (
		<nav className='timesheet-tabs-nav-div'>
			<span style={{ marginBottom: '1rem', fontWeight: 'bold', color: 'rgb(80, 80, 80)', padding: '0 0.3rem' }}>Timesheets</span>
			<NavLink
				className={(navData) => (navData.isActive ? 'active-timesheet-tab text-white' : 'inactive-timesheet-tab text-black')}
				to='/dashboard/getTimesheet'
				style={{ textDecoration: 'none', marginBottom: '0.8rem', fontSize: '0.9rem', padding: '0.3rem', borderRadius: '2px' }}
			>
				View
			</NavLink>
			<NavLink
				className={(navData) => (navData.isActive ? 'active-timesheet-tab text-white' : 'inactive-timesheet-tab text-black')}
				to='/dashboard/viewTime'
				style={{ textDecoration: 'none', marginBottom: '0.8rem', fontSize: '0.9rem', padding: '0.3rem', borderRadius: '2px' }}
			>
				Manage
			</NavLink>
			<NavLink
				className={(navData) => (navData.isActive ? 'active-timesheet-tab text-white' : 'inactive-timesheet-tab text-black')}
				to='/dashboard/timesheetform'
				style={{ textDecoration: 'none', fontSize: '0.9rem', padding: '0.3rem', borderRadius: '2px' }}
			>
				Add
			</NavLink>
		</nav>
	);
}

export default TimesheetTabs;
