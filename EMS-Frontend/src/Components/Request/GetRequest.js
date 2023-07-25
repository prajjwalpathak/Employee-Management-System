import React, { useState, useEffect, useContext } from 'react';
import { YourRequestGetdata, ResendRequest, CancelRequest } from '../../Services/UserServices/RequestService';
import RequestTabs from './RequestTabs';
import NoRecord from '../NoRecord/NoRecord';
import { success } from '../../Utils/SuccessToast';
import { Error } from '../../Utils/ErrorToast';
import 'react-toastify/dist/ReactToastify.css';
import { FcCancel } from 'react-icons/fc';
import { RealDataContext } from '../../Context/LoginContext';
import { Pagination } from '@mui/material';

function GetRequest() {
	const [GetRequestData, SetGetRequestData] = useState(null);
	const [curentPage, setCurrentPage] = useState(1);
	const [resendData, setResendData] = useState({
		userId: '',
		requestId: ''
	});
	const [canceldata, setCancelData] = useState({
		requestId: ''
	});
	const [send, setSend] = useState(false);
	const [cancel, setCancel] = useState(false);
	const [isCalled, setIsCalled] = useState(false);
	const { isRealTime } = useContext(RealDataContext);
	const recordPerPage = 8;
	const lastIndex = curentPage * recordPerPage;
	const firstIndex = lastIndex - recordPerPage;
	const records = GetRequestData && GetRequestData.slice(firstIndex, lastIndex);

	useEffect(() => {
		YourRequestGetdata()
			.then((yourgetrequest) => {
				SetGetRequestData(yourgetrequest);
				setSend(false);
			})
			.catch((e) => {
				console.log(e.message);
			});
	}, [isCalled, isRealTime]);

	useEffect(() => {
		if (send) {
			ResendRequest(resendData)
				.then(async (response) => {
					const msg = await response.json().then((data) => {
						return data.message;
					});
					if (response.status === 201) {
						success(msg);
						setIsCalled((prev) => !prev);
					} else {
						Error(msg);
					}
				})
				.catch((e) => {
					console.log(e.message);
				});
		}
	}, [send]);

	const resendRequest = (id, userid) => {
		if (id) {
			setResendData({
				userId: userid,
				requestId: id
			});
		}
		setSend(true);
	};

	useEffect(() => {
		if (cancel) {
			CancelRequest(canceldata)
				.then(async (response) => {
					const message = await response.json().then((data) => {
						return data.message;
					});
					if (response.status === 201) {
						success(message);
						setIsCalled((prev) => !prev);
					} else {
						Error(message);
					}
				})
				.catch((e) => {
					console.log(e.message);
				});
		}
	}, [cancel]);

	const cancelRequest = (id) => {
		if (id) {
			setCancelData({
				requestId: id
			});
			setCancel((prev) => !prev);
		}
	};

	return (
		<div className='main-content-container'>
			<div className='tabs-div'>
				<RequestTabs />
			</div>
			<section className='table-container'>
				<div className='table-heading'>
					<div>
						<h1 className='table-title'>My Requests</h1>
					</div>
				</div>
				<div className='table-content'>
					<table className='table-content-table'>
						<thead className='table-content-table-head'>
							<tr className='table-head-row'>
								<th className='table-head'>Employee</th>
								<th className='table-head text-center'>Request</th>
								<th className='table-head text-center'>Type</th>
								<th className='table-head text-center'>Start Date</th>
								<th className='table-head text-center'>End Date</th>
								<th className='table-head text-center'>Status</th>
								<th className='table-head text-center'>Action</th>
							</tr>
						</thead>
						<tbody>
							{records ? (
								records.map((request, index) => (
									<tr key={index}>
										<td className='table-data' style={{ display: 'flex', alignItems: 'center' }}>
											<span>
												<img style={{ width: '2rem', height: '2rem', borderRadius: '50%', marginRight: '1rem' }} src={request.profileImage} alt='employee' />
											</span>
											<span style={{ marginRight: '1rem' }}>{request.hrmid} </span>
											<span>{request.name} </span>
										</td>
										<td className='table-data text-center'>{request.request}</td>
										<td className='table-data text-center'>{request.leaveType}</td>
										<td className='table-data text-center'>{request.startDate}</td>
										<td className='table-data text-center'>{request.endDate}</td>
										{request.status === 'Approved' ? (
											<td className='table-data text-center'>
												<i className='bi bi-check-circle-fill text-success icon-center icon-size'></i>
											</td>
										) : request.status === 'Rejected' ? (
											<td className='table-data text-center'>
												<i className='bi bi-x-circle-fill text-danger icon-center icon-size'></i>
											</td>
										) : request.status === 'Cancelled' ? (
											<td className='table-data text-center'>
												<i className='bi bi-x-circle-fill text-danger icon-center icon-size'></i>
											</td>
										) : (
											<td className='table-data text-center'>
												<i className='bi bi-hourglass-split text-warning icon-center icon-size'></i>
											</td>
										)}
										{request.status === 'Pending' ? (
											<td className='table-data text-center '>
												<i
													className='bi bi-trash cancel-icon icon-center icon-size'
													onClick={() => {
														cancelRequest(request.id);
													}}
												></i>
											</td>
										) : request.status === 'Rejected' ? (
											<td className='table-data text-center icon-center icon-size '>
												<i className='bi bi-send text-primary' onClick={() => resendRequest(request.id, request.userId)}></i>
											</td>
										) : request.status === 'Cancelled' ? (
											<td className='table-data text-center'>
												<i className='bi bi-envelope-slash text-danger icon-center icon-size'></i>
											</td>
										) : (
											<td className='table-data text-center'>
												<i className='bi bi-hand-thumbs-up text-success icon-center icon-size'></i>
											</td>
										)}
									</tr>
								))
							) : (
								<>
									<tr>
										<td colSpan='8'>
											<NoRecord />
										</td>
									</tr>
								</>
							)}
						</tbody>
					</table>
					{records?.length > recordPerPage && (
						<div className='d-flex justify-content-center align-items-center py-3'>
							<Pagination
								count={Math.ceil(records.length / recordPerPage)}
								style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
								onChange={(event, value) => {
									setCurrentPage(value);
								}}
							/>
						</div>
					)}
				</div>
			</section>
		</div>
	);
}

export default GetRequest;
