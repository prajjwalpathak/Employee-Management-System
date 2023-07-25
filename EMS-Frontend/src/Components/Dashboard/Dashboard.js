import React, { useState, useEffect } from 'react';
import { LoginContext, RealDataContext } from '../../Context/LoginContext';
import { userData } from '../../Services/UserServices/DashboardService';
import { Outlet } from 'react-router-dom';
import Loader from '../Spinner/Loader';
import Header from './Header';
import Sidebar from './Sidebar';

function MyDashBoard() {
	const [userDatas, setUserDatas] = useState(null);
	const [isRealTime, setIsRealTime] = useState(false);
	const [profileformdata, setProfileFormdata] = useState({
		name: '',
		profileImage: '',
		userId: ''
	});

	useEffect(() => {
		userData()
			.then((data) => {
				setUserDatas((prev) => ({ ...prev, ...data }));
			})
			.catch((e) => {
				console.log(e.message);
			});
	}, []);

	return (
		<LoginContext.Provider value={{ profileformdata, setProfileFormdata }}>
			<RealDataContext.Provider value={{ isRealTime, setIsRealTime }}>
				<section className=' main-container'>
					{userDatas ? (
						<div className='wrapper d-flex'>
							<Sidebar />
							<div className='right-sidebar '>
								<Header />

								<div className='right-middle-content'>
									<Outlet />
								</div>
							</div>
						</div>
					) : (
						<section style={{ height: '100vh' }}>
							<Loader />
						</section>
					)}
				</section>
			</RealDataContext.Provider>
		</LoginContext.Provider>
	);
}

export default MyDashBoard;
