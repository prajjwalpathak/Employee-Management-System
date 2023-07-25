import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDays, eachDayOfInterval, format, subDays, startOfWeek } from 'date-fns';
import { Socket } from '../../Socket';
import LeftRow from './LeftRow';
import RightRow from './RightRow';
import { LoginContext } from '../../Context/LoginContext';
import { CreateTimeSheet, getTimeSheet } from '../../Services/UserServices/TimesheetService';
import TimesheetTabs from '../Timesheet/TimesheetTabs';
import { timesheetTemplate, reduceFetchedTimeSheetData, finalWorkingHours, formatTotalTime } from '../../Utils/GetTemplate';
import { totalTimesheetRecords, finalTimesheetData } from '../../Utils/TemplateRecords';
import { success } from '../../Utils/SuccessToast';
import { Error } from '../../Utils/ErrorToast';

const Timesheetform = () => {
	const navigate = useNavigate();
	const [start, setStart] = useState(startOfWeek(new Date(), { weekStartsOn: 0 })); // start of the week
	const [end, setEnd] = useState(addDays(start, 6)); // end of the week
	const [slide, setSlide] = useState([]);
	const [date, setdate] = useState([]);
	const [row, setRow] = useState(1);
	const startDate = start.toLocaleDateString('en-GB').split('/');
	const endDate = end.toLocaleDateString('en-GB').split('/');
	let formattedStartDate = startDate[0] + '-' + startDate[1] + '-' + startDate[2];
	let formattedEndDate = endDate[0] + '-' + endDate[1] + '-' + endDate[2];
	let week = `${formattedStartDate} - ${formattedEndDate}`;
	const { profileformdata } = useContext(LoginContext);
	const [isFilled, setFilled] = useState(false);
	const [totalHours, setTotalHours] = useState({});
	const trackRow = useRef(1);
	const dateTrack = useRef([]);
	const [userTimeSheetData, setUserTimeSheetData] = useState([]);
	const [userFinalData, setUserFinalData] = useState([]);
	const [isReset, setReset] = useState(false);

	const handlechange = (event) => {
		let timeValue = '';
		const { name, value, dataset } = event.target;
		if (name === 'totalTime') {
			timeValue = formatTotalTime(value);
		}
		const tempdata = userFinalData;
		const currentData = tempdata[dataset.row - 1];

		for (let i = 0; i < currentData.length; i++) {
			if (currentData[i]?.date === dataset.date && currentData[i].timesheetId === parseInt(dataset.row)) {
				currentData[i] = {
					...currentData[i],
					submittedHours: name === 'totalTime' && timeValue.split(':')[1] ? timeValue : value,
					[name]: name === 'totalTime' && timeValue.split(':')[1] ? timeValue : value.trim()
				};
				break;
			} else {
				if (name !== 'totalTime') {
					currentData[i] = {
						...currentData[i],
						[name]: value.trim(),
						userId: profileformdata.userId
					};
				}
			}
		}
		tempdata[dataset.row - 1] = currentData;
		setUserFinalData(tempdata);
	};

	useEffect(() => {
		const daydate = eachDayOfInterval({ start: start, end: end }).map((date) => {
			const monthDate = format(date, 'LLL dd');
			const weekDay = format(date, 'EEE ');
			return { monthDate: monthDate, weekDay: weekDay };
		});

		const dd = eachDayOfInterval({ start: start, end: end }).map((date) => {
			const [Date, month, year] = date.toLocaleDateString('en-GB').split('/');

			return `${year}-${month}-${Date}`;
		});

		dateTrack.current = dd;
		setdate(dd);
		setSlide(daydate);
	}, [start, end]);

	// getTimesheetData
	useEffect(() => {
		getTimeSheet(week)
			.then((data) => {
				const totalHour = finalWorkingHours(data);
				const newRecordsLength = reduceFetchedTimeSheetData(data).length;
				const totalTimesheet = totalTimesheetRecords(data, newRecordsLength, dateTrack.current, formattedStartDate, formattedEndDate, profileformdata?.userId);
				trackRow.current = newRecordsLength;
				setUserTimeSheetData(data);
				setUserFinalData(() => [...totalTimesheet]);
				setTotalHours(totalHour);
				setRow(newRecordsLength);
			})
			.catch((err) => {
				const initialData = timesheetTemplate(dateTrack.current, 1, formattedStartDate, formattedEndDate, profileformdata?.userId);

				setUserFinalData(() => [initialData]);
				setTotalHours({
					finalTotalHours: 0,
					finalTotalMinutes: 0
				});
				setRow(1);
				trackRow.current = 1;
			});
	}, [start, end, isReset]);

	const handleSubmit = () => {
		if (userFinalData.length) {
			const finalTimesheetRecord = finalTimesheetData(userFinalData, userTimeSheetData);
			CreateTimeSheet(finalTimesheetRecord)
				.then((data) => {
					success(data.message);
					Socket.emit('sendNotifications');
					navigate('/dashboard/getTimesheet');
				})
				.catch((e) => {
					console.log(e.message);
				});
		}
	};

	// left and right table row

	const leftRows = [];
	const rightRows = [];

	for (let i = 1; i <= row; i++) {
		leftRows.push(<LeftRow row={i} key={i} handlechange={handlechange} week={week} start={start} end={end} />);
		rightRows.push(
			<RightRow key={i} row={i} handlechange={handlechange} date={date} week={week} start={start} end={end} slide={slide} userFinalData={userFinalData} setUserFinalData={setUserFinalData} />
		);
	}

	// add one more row in the table
	const addRow = () => {
		setRow((prevRow) => prevRow + 1);
		const newCreatedRow = timesheetTemplate(date, trackRow.current + 1, formattedStartDate, formattedEndDate, profileformdata?.userId);
		setUserFinalData((prevData) => [...prevData, newCreatedRow]);
		trackRow.current = trackRow.current + 1;
	};

	//nextWeek
	const nextweek = useCallback(() => {
		setStart(addDays(start, 7));
		setEnd(addDays(end, 7));
	}, [start, end]);

	// prevWeek
	const prevWeek = useCallback(() => {
		setStart(subDays(start, 7));
		setEnd(subDays(end, 7));
	}, [start, end]);

	return (
		<div className='main-content-container'>
			<div className='tabs-div'>
				<TimesheetTabs />
			</div>
			<section className='table-container'>
				<div className='table-heading'>
					<div>
						<h1 className='table-title'>Add Timesheet</h1>
					</div>
				</div>
				<div className='table-content'>
					<div className='week-selector-container'>
						<div className='week-selector'>
							<i className='bi bi-arrow-left-circle' onClick={prevWeek} style={{ cursor: 'pointer' }}></i>
							<span className='week-span'>
								{formattedStartDate} - {formattedEndDate}
							</span>
							<i className='bi bi-arrow-right-circle' onClick={nextweek} style={{ cursor: 'pointer' }}></i>
						</div>
					</div>
					<div className='timesheet-container' style={{ display: 'flex', flexDirection: 'column' }}>
						<div className='outer-table-div'>
							<div className='left-table-div'>
								<table>
									<thead>
										<tr>
											<th className='left-table-th'>Client Name</th>
											<th className='left-table-th'>Project Name</th>
											<th className='left-table-th'>Job Name</th>
										</tr>
									</thead>

									<tbody>{leftRows}</tbody>
								</table>
							</div>
							<div className='right-table-div'>
								<table className='date-table'>
									<thead>
										<tr>
											<th className='right-table-th'>Work Item</th>
											<th className=''></th>
											<th className='right-table-th'>Billable Status</th>
											{slide.map((day, index) => (
												<th className='date-th' key={index}>
													{day.monthDate}
													<br />
													{day.weekDay}
												</th>
											))}
											<th className='date-th'>Total</th>
										</tr>
									</thead>
									<tbody>{rightRows}</tbody>

									<tbody>
										<tr>
											<td></td>
											<td></td>
											<td style={{ textAlign: 'center', padding: '1rem 0 0 0' }}>
												<span>Total</span>
											</td>

											{date.map((day, index) => (
												<td key={index} className='date-td-span-col'>
													<span>
														{totalHours[day]?.hour ? String(totalHours[day]?.hour + parseInt(totalHours[day]?.min / 60)).padStart(2, 0) : '00'}:
														{totalHours[day]?.min ? String(totalHours[day]?.min % 60).padStart(2, 0) : '00'}
													</span>
												</td>
											))}

											<td className='date-td-span-col'>
												<span>
													{totalHours?.finalTotalHours ? String(totalHours?.finalTotalHours + parseInt(totalHours?.finalTotalMinutes / 60)).padStart(2, 0) : '00'}:
													{totalHours?.finalTotalMinutes ? String(totalHours?.finalTotalMinutes % 60).padStart(2, 0) : '00'}
												</span>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								marginBottom: '3rem'
							}}
						>
							<button onClick={addRow} className='border-0 bg-white' style={{ marginLeft: '1rem' }}>
								<i className='bi bi-plus-circle text-primary'></i>
								<span className='text-primary' style={{ marginLeft: '0.5rem' }}>
									Add Row
								</span>
							</button>
						</div>
						<div style={{ display: 'flex', padding: '0.5rem' }}>
							<button className='submit-button' onClick={handleSubmit}>
								Submit
							</button>
							<button className='close-button' onClick={() => setReset(!isReset)}>
								Reset
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Timesheetform;
