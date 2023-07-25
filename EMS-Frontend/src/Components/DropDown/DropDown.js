import React from 'react';
import { useEffect, useRef } from 'react';
import './DropDown.css';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../Services/UserServices/DashboardService';
import { success } from '../../Utils/SuccessToast';

export const DropDown = ({ setOpenProfile }) => {
	const navigate = useNavigate();

	const dropdownRef = useRef(null); //for close outside

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target) && event.target.id !== 'down') {
				setOpenProfile(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleLogOut = () => {
		userLogout().then((data) => {
			localStorage.removeItem('loggedInUser');
			navigate('/');
			success(data.message);
		});
	};
	return (
		<div className='dropdown-div' ref={dropdownRef}>
			<button className='logout-btn' onClick={handleLogOut}>
				Logout
				<span className='logout-icon'>
					<i className='bi bi-box-arrow-right'></i>
				</span>
			</button>
		</div>
	);
};
