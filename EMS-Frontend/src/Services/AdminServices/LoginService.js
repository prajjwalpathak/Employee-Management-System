import { url } from '../../Constant/Url';

export const adminLogin = async (data) => {
	const response = await fetch(url + 'admin-login/', {
		method: 'POST',
		mode: 'cors',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		credentials: 'include',
		body: new URLSearchParams(data)
	});
	return response;
};

export const adminLogout = async () => {
	const response = await fetch(url + 'admin/logout', {
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
