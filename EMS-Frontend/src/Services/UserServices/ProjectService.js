import { url } from '../../Constant/Url';

export const fetchProjects = async () => {
	const response = await fetch(url + 'user/projects/get-user-projects/', {
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

export const getProjectDetail = async (projectId) => {
	const response = await fetch(url + `user/projects/get-project?projectId=${projectId}`, {
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
