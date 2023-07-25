import React, { useEffect, useState, useRef } from 'react';
import './Timesheet.css';
import { getTimeSheet } from '../../Services/UserServices/TimesheetService';
import DescriptionForm from './DescriptionForm';
import { formatTotalTime, reduceFetchedTimeSheetData } from '../../Utils/GetTemplate';

const RightRow = ({ row, handlechange, date, week, start, end, slide, userFinalData, setUserFinalData }) => {
	const [userTimeSheetData, setuserTimeSheetData] = useState([]);
	const [isDescription, setDescription] = useState(false);

	useEffect(() => {
		getTimeSheet(week)
			.then((data) => {
				const newPreparedData = reduceFetchedTimeSheetData(data);
				setuserTimeSheetData(() => [...newPreparedData]);
			})
			.catch((e) => {
				setuserTimeSheetData([]);
			});

		return () => {
			setDescription(false);
		};
	}, [start, end]);

	return (
		<>
			<tr>
				<td style={{ position: 'relative' }}>
					<input
						type='text'
						className='right-table-td'
						onChange={handlechange}
						name='workItem'
						data-row={row}
						defaultValue={userTimeSheetData[row - 1]?.workItem || ''}
						disabled={userTimeSheetData[row - 1]?.workItem ? true : false}
					/>
				</td>
				<td style={{ position: 'relative' }}>
					<i className='bi bi-journal' onClick={() => setDescription(!isDescription)}></i>
					{isDescription ? <DescriptionForm slide={slide} setDescription={setDescription} userFinalData={userFinalData} setUserFinalData={setUserFinalData} row={row} date={date} /> : ''}
				</td>

				<td>
					<select
						className='right-table-td'
						onChange={handlechange}
						name='billableStatus'
						data-row={row}
						defaultValue={userTimeSheetData[row - 1]?.billableStatus}
						disabled={userTimeSheetData[row - 1]?.billableStatus ? true : false}
						value={userTimeSheetData[row - 1]?.billableStatus}
					>
						<option defaultValue='Non-Billable'>Non-Billable</option>
						<option value='Billable'>Billable</option>
					</select>
				</td>

				{date.map((day, index) => (
					<td key={index}>
						<input
							type='text'
							className={index === 0 || index === 6 ? 'date-td date-holiday' : 'date-td'}
							placeholder='00:00'
							onChange={handlechange}
							name='totalTime'
							onBlur={(e) => {
								e.target.value = e.target.value === '' ? '' : formatTotalTime(e.target.value);
							}}
							defaultValue={userTimeSheetData.length > 0 ? userTimeSheetData[row - 1]?.dates[day] : ''}
							disabled={userTimeSheetData.length > 0 && userTimeSheetData[row - 1]?.dates[day] ? true : false}
							data-date={day}
							data-row={row}
						/>
					</td>
				))}

				<td className='date-td-span-row'>
					<span>
						{userTimeSheetData[row - 1]?.totalHour ? String(userTimeSheetData[row - 1]?.totalHour + parseInt(userTimeSheetData[row - 1]?.totalMinute / 60)).padStart(2, 0) : '00'}:
						{userTimeSheetData[row - 1]?.totalMinute ? String(userTimeSheetData[row - 1]?.totalMinute % 60).padStart(2, 0) : '00'}
					</span>
				</td>
			</tr>
		</>
	);
};

export default RightRow;
