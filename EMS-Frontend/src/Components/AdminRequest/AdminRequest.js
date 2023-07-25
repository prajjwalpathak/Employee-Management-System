import { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth } from 'date-fns';
import NoRecord from '../NoRecord/NoRecord';
import { getRequestData } from '../../Services/AdminServices/RequestService';
import './AdminRequest.css';
import { Pagination } from '@mui/material';

const AdminRequest = () => {
	const [requestData, setRequestData] = useState(null);
	const [startDate, setStartDate] = useState(startOfMonth(new Date()).toLocaleDateString('en-GB').split('/').reverse().join('-'));
	const [endDate, setEndDate] = useState(endOfMonth(new Date()).toLocaleDateString('en-GB').split('/').reverse().join('-'));
	const [curentPage, setCurrentPage] = useState(1);
	const recordPerPage = 8;
	const lastIndex = curentPage * recordPerPage;
	const firstIndex = lastIndex - recordPerPage;
	const records = requestData && requestData.slice(firstIndex, lastIndex);

	const handleChange = (event) => {
		const { value, name } = event.target;
		if (name === 'startdate') {
			setStartDate(value);
		} else {
			setEndDate(value);
		}
	};

	useEffect(() => {
		getRequestData(startDate, endDate)
			.then((data) => {
				setRequestData(data);
			})
			.catch((e) => {
				setRequestData(null);
			});
	}, [startDate, endDate]);

	return (
		<div className='requests-div'>
			<section className='admin-table-container'>
				<div className='table-heading'>
					<div>
						<h1 className='table-title'>Requests</h1>
					</div>
				</div>
				<div className='requests-range-input-div'>
					<h6 className='requests-range-input-heading'>Select Range</h6>
					<input className='requests-range-input' type='date' name='startdate' onChange={handleChange} value={startDate} />
					<input className='requests-range-input' type='date' name='enddate' onChange={handleChange} value={endDate} />
				</div>
				<div className='table-content'>
					<table className='table-content-table'>
						<thead className='table-content-table-head'>
							<tr className='admin-requests-table-row'>
								<td className='table-head'>Employee</td>
								<td className='table-head text-center'>Request Type</td>
								<td className='table-head text-center'>Leave Type</td>
								<td className='table-head text-center'>Start Date</td>
								<td className='table-head text-center'>End Date</td>
								<td className='table-head text-center'>Status</td>
							</tr>
						</thead>
						<tbody>
							{records ? (
								records.map((item, index) => (
									<tr key={index} className='admin-requests-table-row'>
										<td className='table-data '>
											<img className='employee-profile-image' src={item?.profileImage} alt='employee' />
											<span className='span-margin'></span>
											{item?.hrmid}
											<span className='span-margin'></span>
											{item?.name}
										</td>
										<td className='table-data text-center'>{item?.request}</td>
										<td className='table-data text-center'>{item?.leaveType}</td>
										<td className='table-data text-center'>{item?.startDate}</td>
										<td className='table-data text-center'>{item?.endDate}</td>
										{item?.status === 'Approved' ? (
											<td className='table-data text-center'>
												<i className='bi bi-check-circle-fill text-success icon-size'></i>
											</td>
										) : item?.status === 'Rejected' ? (
											<td className='table-data text-center'>
												<i className='bi bi-x-circle-fill text-danger icon-size'></i>
											</td>
										) : item?.status === 'Cancelled' ? (
											<td className='table-data text-center'>
												<i className='bi bi-x-circle-fill text-danger icon-size'></i>
											</td>
										) : (
											<td className='table-data text-center'>
												<i className='bi bi-hourglass-split text-warning icon-size'></i>
											</td>
										)}
									</tr>
								))
							) : (
								<>
									<tr className='admin-requests-table-row'>
										<td colSpan='8'>
											<NoRecord />
										</td>
									</tr>
								</>
							)}
						</tbody>
					</table>
				</div>
				{records > recordPerPage && (
					<div className='  d-flex justify-content-center align-items-center py-3'>
						<Pagination
							count={Math.ceil(requestData.length / recordPerPage)}
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center'
							}}
							onChange={(event, value) => {
								setCurrentPage(value);
							}}
						/>
					</div>
				)}
			</section>
		</div>
	);
};

export default AdminRequest;
