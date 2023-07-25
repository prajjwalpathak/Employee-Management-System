import React, { useState, useEffect, useContext } from 'react';
import { useRef } from 'react';
import { BiBell, BiChevronDown, BiSearch, BiPlusCircle } from 'react-icons/bi';
import './Dashboard.css';
import { Socket } from '../../Socket';
import { LoginContext, RealDataContext } from '../../Context/LoginContext';
import { DropDown } from '../DropDown/DropDown';
import { Notification } from '../Notification/Notification';
import { ProfileFormData } from '../../Services/UserServices/ProfileService';
import { UserSearchBar, GetUserId } from '../../Services/UserServices/UserSearchService';
import { useNavigate } from 'react-router-dom';

function Header() {
	const [showModal, setShowModal] = useState(false);
	const [openProfile, setOpenProfile] = useState(false);
	const [notificationData, setNotificationData] = useState([]);
	const [openNotification, setOpenNotification] = useState(false);
	const { profileformdata, setProfileFormdata } = useContext(LoginContext);
	const { setIsRealTime } = useContext(RealDataContext);

	// search Field

	const [input, setInput] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const [notify, setNotify] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		Socket.connect();
		Socket.emit('join', 'Joined Room');

		Socket.on('notify', (data) => {
			setNotify((previousState) => !previousState);
		});

		Socket.on('notifications', (data) => {
			setNotificationData(data);
			setIsRealTime((prev) => !prev);
		});

		return () => {
			Socket.disconnect();
			Socket.off('notify');
			Socket.off('notifications');
			Socket.off('join');
		};
	}, [notify]);

	const searchBoxRef = useRef(null); //for close outside

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
				setShowResults(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	//for search name
	useEffect(() => {
		if (input !== '') {
			UserSearchBar(input)
				.then((UserSearch) => {
					const result = UserSearch.filter((Name) => {
						return Name && Name.name && Name.name.toString().toLowerCase().includes(input.toString().toLowerCase());
					});
					setSearchResult(result);
				})
				.catch((e) => {
					console.log(e.message);
				});
		} else {
			setSearchResult([]);
			setShowResults(false);
		}
	}, [input]);

	const handleChange = (value) => {
		setInput(value);
		setShowResults(true);
	};

	const handleRowClick = (id) => {
		navigate(`/dashboard/searchprofile/${id}`);
		setInput('');
	};

	const handleCloseModal = () => {
		document.body.style.overflow = 'visible';
		setShowModal(false);
	};

	const handleShowModal = () => {
		document.body.style.overflow = 'hidden';
		setShowModal(true);
	};

	useEffect(() => {
		ProfileFormData().then((data) => {
			setProfileFormdata({
				name: data.profile.name,
				profileImage: data.profile.profileImage,
				userId: data.profile.userId
			});
		});
	}, []);

	return (
		<div className='right-top'>
			<div className='header-inner-div'>
				<div className='search-div'>
					<div className='search-bar-div'>
						<div className='icon-div'>
							<i className='bi bi-search search-bar-icon icon-center'></i>
						</div>
						<input className='search-bar-input' type='text' placeholder='search' value={input} onChange={(e) => handleChange(e.target.value)} />
					</div>
					<div className='search-results-div'>
						{showResults && (
							<div className='search-results' ref={searchBoxRef}>
								{searchResult.map((Name) => (
									<div className='search-result-card' onClick={() => handleRowClick(Name.id)}>
										<img className='search-result-profile' src={Name.profileImage} alt='profile' />
										<span className='search-result-hrmid'>{Name.hrmid}</span>
										<span className='search-result-name'>{Name.name}</span>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
				<div className='header-profile-div'>
					<div className='notification-div'>
						<div className='bell-icon-div'>
							<i
								className='bi bi-bell header-bell-icon icon-center'
								onClick={() => {
									setOpenNotification((previousState) => !previousState);
									document.body.style.overflow = 'hidden';
								}}
							></i>
						</div>
						{notificationData?.unread === undefined || notificationData?.unread === 0 ? <></> : <div className='notification-unread-count'>{notificationData.unread}</div>}
						{openNotification && (
							<Notification
								messages={notificationData?.messages}
								unread={notificationData?.unread}
								setOpenNotification={setOpenNotification}
								closeNotification={() => {
									setOpenNotification((previousState) => !previousState);
									document.body.style.overflow = 'visible';
								}}
							/>
						)}
					</div>

					<div className='header-user-profile'>
						<img className='header-profile-image' src={profileformdata?.profileImage || ''} alt='profile' />
						<div className='header-profile-name-div'>
							<span className='profile-name'>{profileformdata?.name || ''}</span>
							<i
								className='bi bi-caret-down-fill cheveron-down icon-center'
								onClick={() => {
									setOpenProfile((prev) => !prev);
								}}
							></i>
						</div>
						{openProfile && <DropDown setOpenProfile={setOpenProfile} />}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
