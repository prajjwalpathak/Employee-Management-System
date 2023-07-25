import { url } from '../../Constant/Url';

export const getSkills = async (userId) => {
	const response = await fetch(url + `admin/get-user-skills?userId=${userId}`, {
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



