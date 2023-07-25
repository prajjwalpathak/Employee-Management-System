import React, { useEffect, useState } from 'react';
import './Timesheet.css';
import { getTimeSheet, getClientAndProject } from '../../Services/UserServices/TimesheetService';
import { reduceFetchedTimeSheetData } from '../../Utils/GetTemplate';

const LeftRow = ({ row, handlechange, week, start, end }) => {
	const [userTimeSheetData, setuserTimeSheetData] = useState([]);
	const [optionData, setOptionData] = useState([]);

	useEffect(() => {
		getClientAndProject()
			.then((data) => {
				setOptionData(data);
			})
			.catch((e) => {
				console.log(e.message);
			});
	}, []);

	useEffect(() => {
		getTimeSheet(week)
			.then((data) => {
				const newPreparedData = reduceFetchedTimeSheetData(data);
				setuserTimeSheetData(() => [...newPreparedData]);
			})
			.catch((e) => {
				console.log(e.message);
			});

		return () => {
			setuserTimeSheetData([]);
		};
	}, [start, end]);

	return (
		<>
			<tr>
				<td>
					<select
						className='left-table-td'
						name='clientName'
						onChange={handlechange}
						defaultValue={userTimeSheetData[row - 1]?.clientName}
						disabled={userTimeSheetData[row - 1]?.clientName ? true : false}
						data-row={row}
						value={userTimeSheetData[row - 1]?.clientName}
					>
						<option value='' hidden>
							Select Client
						</option>
						<option value='Celebal Tech'>Celebal Tech</option>
						{optionData.map((data, index) => (
							<option value={data.clientName} key={index}>
								{data.clientName}
							</option>
						))}
					</select>
				</td>
				<td>
					<select
						className='left-table-td'
						onChange={handlechange}
						name='projectName'
						data-row={row}
						defaultValue={userTimeSheetData[row - 1]?.projectName}
						disabled={userTimeSheetData[row - 1]?.clientName ? true : false}
						value={userTimeSheetData[row - 1]?.projectName}
					>
						<option value='' hidden>
							Select Project
						</option>
						<option value='CT L&D'>CT L&D</option>
						<option value='CT LMS'>CT LMS</option>
						{optionData.map((data, index) => (
							<option value={data.projectName} key={index}>
								{data.projectName}
							</option>
						))}
					</select>
				</td>
				<td>
					<input
						className='left-table-td'
						onChange={handlechange}
						name='jobName'
						data-row={row}
						defaultValue={userTimeSheetData[row - 1]?.jobName}
						disabled={userTimeSheetData[row - 1]?.clientName ? true : false}
						value={userTimeSheetData[row - 1]?.jobName}
					/>
				</td>
			</tr>
		</>
	);
};

export default LeftRow;
