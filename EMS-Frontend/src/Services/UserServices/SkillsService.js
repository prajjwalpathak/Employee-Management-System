import { url } from '../../Constant/Url';

export const fetchSkills = async () => {
	const response = await fetch(url + 'user/skills/get-user-skills', {
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

export const updateSkills = async (data) => {
	const response = await fetch(url + 'user/skills/update-user-skills', {
		method: 'PUT',
		mode: 'cors',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		credentials: 'include',
		body: new URLSearchParams(data)
	});
	return response.json();
};
