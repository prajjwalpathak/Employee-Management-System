import { url } from '../../Constant/Url';

export const userLogout = async () => {
	const response = await fetch(url + 'user/logout', {
		method: 'GET',
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

export const userData = async () => {
	const response = await fetch(url + 'user/get-user', {
		method: 'GET',
		// mode: "cors",
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include'
	});

	if (!response.ok) {
		throw new Error('Data could not be fetched');
	} else {
		return await response.json();
	}
};
