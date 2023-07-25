import { timesheetTemplate } from './GetTemplate';

const getFinalTotalTimesheet = (totalTimesheet, timesheetData) => {
	const localTimeSheetData = totalTimesheet;

	localTimeSheetData.forEach((item) => {
		item.forEach((obj) => {
			timesheetData.forEach((tempData) => {
				if (parseInt(tempData.timesheetId) === obj.timesheetId && tempData.date === obj.date) {
					obj.clientName = tempData.clientName;
					obj.projectName = tempData.projectName;
					obj.jobName = tempData.jobName;
					obj.workItem = tempData.workItem;
					obj.billableStatus = tempData.billableStatus;
					obj.description = tempData.description;
					obj.totalTime = tempData.totalTime;
					obj.submittedHours = tempData.submittedHours;
					obj.userId = tempData.userId;
				} else {
					obj.clientName = tempData.clientName;
					obj.projectName = tempData.projectName;
					obj.jobName = tempData.jobName;
					obj.workItem = tempData.workItem;
					obj.userId = tempData.userId;
					obj.billableStatus = tempData.billableStatus;
				}
			});
		});
	});
	return localTimeSheetData;
};

export const totalTimesheetRecords = (timesheetData, timesheetLength, date, formattedStartDate, formattedEndDate, userId) => {
	const totalTimesheet = [];

	for (let start = 1; start <= timesheetLength; start = start + 1) {
		const data = timesheetTemplate(date, start, formattedStartDate, formattedEndDate, userId);
		totalTimesheet.push(data);
	}
	const finalOutput = getFinalTotalTimesheet(totalTimesheet, timesheetData);
	return finalOutput;
};

export const finalTimesheetData = (preparedTimesheetData, timesheetData) => {
	let finalData = [];

	preparedTimesheetData.forEach((item) => {
		item.forEach((ele) => {
			if (ele?.totalTime !== '' && ele?.clientName && ele?.projectName && ele?.billableStatus && ele?.jobName && ele?.workItem) {
				finalData.push(ele);
			}
		});
	});

	if (timesheetData.length > 0) {
		const lastData = finalData.filter((item) => {
			return !timesheetData.some((element) => {
				return item.date === element.date && item.timesheetId === parseInt(element.timesheetId);
			});
		});
		finalData = [...lastData];
	}

	return finalData;
};
