import { url } from '../../Constant/Url';

export const getProjects = async () => {
	const response = await fetch(url + 'admin/projects/get-projects', {
		mode: 'cors',
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include'
	});

	if (!response.ok) {
		throw new Error('Data could not be fetched');
	} else {
		return await response.json();
	}
};

export const addProject = async (data) => {
	const response = await fetch(url + 'admin/projects/add-project', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		credentials: 'include',
		body: new URLSearchParams(data)
	});

	if (!response.ok) {
		throw new Error('Data could not be fetched');
	} else {
		return await response.json();
	}
};

export const UpdateProjectDetails = async (data) => {
	const response = await fetch(url + 'admin/projects/update-project', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		credentials: 'include',
		body: new URLSearchParams(data)
	});

	if (!response.ok) {
		throw new Error('Data could not be fetched');
	} else {
		return await response.json();
	}
};

export const DeleteProjectData = async (data) => {
	const response = await fetch(url + 'admin/projects/delete-project', {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		credentials: 'include',
		body: new URLSearchParams(data)
	});

	if (!response.ok) {
		throw new Error('Data could not be fetched');
	} else {
		return await response.json();
	}
};

export const getProjectDetail = async (projectId) => {
	const response = await fetch(url + `admin/projects/get-project?projectId=${projectId}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include'
	});

	if (!response.ok) {
		throw new Error('Data could not be fetched');
	} else {
		return await response.json();
	}
};
