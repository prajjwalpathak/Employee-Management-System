import React, { useState, useEffect } from 'react';
import './Skills.css';
import NoRecord from '../NoRecord/NoRecord';
import { fetchSkills } from '../../Services/UserServices/SkillsService';

function Skill() {
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		fetchSkills()
			.then((data) => {
				setUserData(data);
			})
			.catch((e) => {
				console.log(e.message);
			});
	}, []);

	return (
		<section className='skills-container'>
			<div className='skills-heading-div'>
				<h5 className='skills-heading'>My Skills</h5>
			</div>

			<div className='skills-content'>
				{userData ? (
					<>
						<div className='skill-container'>
							<h5 className='skill-title'>Primary Skills</h5>
							<div className='skill-content-div'>
								<span className='skill-content'>{userData?.primarySkills || ''}</span>
							</div>
						</div>
						<div className='skill-container'>
							<h5 className='skill-title'>Secondary Skills</h5>
							<div className='skill-content-div'>
								<span className='skill-content'>{userData?.secondarySkills || ''}</span>
							</div>
						</div>
						<div className='skill-container'>
							<h5 className='skill-title'>Certifications</h5>
							<div className='skill-content-div no-border'>
								<span className='skill-content'>{userData?.certifications || ''}</span>
							</div>
						</div>
					</>
				) : (
					<NoRecord />
				)}
			</div>
		</section>
	);
}

export default Skill;
