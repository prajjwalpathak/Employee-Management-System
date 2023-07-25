import { url } from '../../Constant/Url';

// user/timesheets/get-user-weekly-timesheets?week=30-04-2023 - 06-05-2023

export const fetchTimeSheet = async () => {
	const response = await fetch(url + 'user/timesheets/get-user-timesheets', {
		mode: 'cors',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include'
	});

	if (!response.ok) {
		throw new Error('Data could not be fetched');
	} else {
		return await response.json();
	}
};

export const fetchReportingTimesheet = async () => {
	const response = await fetch(url + 'user/timesheets/get-user-subordinates-timesheets', {
		mode: 'cors',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include'
	});

	if (!response.ok) {
		throw new Error('Data could not be fetched');
	} else {
		return await response.json();
	}
};

export async function UpdateReportingTimesheet(data) {
	const response = await fetch(url + 'user/timesheets/update-user-subordinate-timesheet', {
		method: 'PUT',
		credentials: 'include',
		body: new URLSearchParams(data)
	});
	return response.json();
}

export const CreateTimeSheet = async (formData) => {
	const timesheetData = JSON.stringify(formData);

	const response = await fetch(url + 'user/timesheets/add-user-timesheet', {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({ data: timesheetData })
	});
	if (!response.ok) {
		throw new Error('there is some error..');
	} else {
		return response.json();
	}
};

export const getTimeSheet = async (week) => {
	const response = await fetch(url + `user/timesheets/get-user-weekly-timesheets?week=${week}`, {
		mode: 'cors',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include'
	});

	if (!response.ok) {
		throw new Error('Data could not be fetched');
	} else {
		return response.json();
	}
};

// user/projects/get-user-projects-minimal-data

export const getClientAndProject = async () => {
	const response = await fetch(url + `user/projects/get-user-projects-minimal-data`, {
		mode: 'cors',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include'
	});
	if (!response.ok) {
		throw new Error('Data could not be fetched');
	} else {
		return response.json();
	}
};
