import { url } from '../../Constant/Url';

export const adminData = async () => {
	const response = await fetch(url + 'admin/get-admin', {
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
