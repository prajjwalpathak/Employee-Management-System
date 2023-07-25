import Skill from '../Skills/Skills';
import Timer from '../Timer/Timer';
import RequestTable from '../Request/RequestTable';
import DashboardWFH from '../Request/DashboardWFH';
import ProjectTable from '../Project/ProjectTable';
import TimesheetTable from '../Timesheet/TimesheetTable';

function Home() {
	return (
		<div className='home-container'>
			<div className='home-first-row'>
				<div style={{ width: '50%', backgroundColor: '#f7f9fb', borderRadius: '8px' }}>
					<Timer />
				</div>
				<div style={{ width: '25%', backgroundColor: '#f7f9fb', borderRadius: '8px' }}>
					<RequestTable />
				</div>
				<div style={{ width: '25%', backgroundColor: '#f7f9fb', borderRadius: '8px' }}>
					<DashboardWFH />
				</div>
			</div>

			<div className='home-second-row'>
				<div style={{ width: '50%', backgroundColor: '#f7f9fb', borderRadius: '8px' }}>
					<Skill />
				</div>
				<div style={{ width: '50%', backgroundColor: '#f7f9fb', borderRadius: '8px' }}>
					<TimesheetTable />
				</div>
			</div>
			<div className='home-third-row'>
				<div style={{ width: '100%', backgroundColor: '#f7f9fb', borderRadius: '8px' }}>
					<ProjectTable />
				</div>
			</div>
		</div>
	);
}

export default Home;
