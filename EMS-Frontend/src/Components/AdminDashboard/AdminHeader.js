import React, { useState, useEffect, useRef } from 'react';
import FileUpload from './FileUpload';
import { useNavigate } from 'react-router-dom';
import { adminData } from '../../Services/AdminServices/AdminService';
import { AdminDropDown } from '../AdminDropDown/AdminDropDown';
import { adminSearchBar } from '../../Services/AdminServices/SearchService';
import './AdminDashboard.css';

function AdminHeader() {
	const [showModal, setShowModal] = useState(false);
	const [openProfile, setOpenProfile] = useState(false);
	const [Admindata, setAdminData] = useState(null);

	// search bar
	const [input, setInput] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const navigate = useNavigate();

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
			adminSearchBar(input)
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
		navigate(`/admindashboard/search-user/${id}`);
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
		adminData().then((data) => {
			setAdminData(data);
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
									<div className='search-result-card' key={Name.id} onClick={() => handleRowClick(Name.id)}>
										<img className='search-result-profile' src={Name.profileImage} alt='profile' />
										<span className='search-result-hrmid'>{Name.hrmid}</span>
										<span className='search-result-name'>{Name.name}</span>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				<div className='upload-div'>
					<button className='upload-button' onClick={handleShowModal}>
						Upload
					</button>
					<FileUpload className='file-upload-dialog' isOpen={showModal} onClose={handleCloseModal} />
				</div>

				<div className='header-profile-div'>
					<div className='header-user-profile'>
						<div
							style={{
								background: '#d5ddda',
								borderRadius: '50%',
								width: '40px',
								height: '40px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								textTransform: 'uppercase'
							}}
						>
							{Admindata?.name.split(' ')[0][0]}
							{Admindata?.name.split(' ')[1][0]}
						</div>
						<div className='header-profile-name-div'>
							<span className='profile-name'>{Admindata?.name || ''}</span>
							<i
								className='bi bi-caret-down-fill cheveron-down icon-center'
								onClick={() => {
									setOpenProfile((prev) => !prev);
								}}
							></i>
						</div>
						{openProfile && <AdminDropDown setOpenProfile={setOpenProfile} />}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdminHeader;
