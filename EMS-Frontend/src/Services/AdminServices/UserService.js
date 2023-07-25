import { url } from '../../Constant/Url';

export const getUsers = async () => {
	const response = await fetch(url + 'admin/get-users', {
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
