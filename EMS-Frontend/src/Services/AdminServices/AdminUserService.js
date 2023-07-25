import { url } from '../../Constant/Url';

export const addNewUser = async (data) => {
    
	const response = await fetch(url + 'admin/add-user', {
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

export const UpdateUserDetails = async (data) => {

	const response = await fetch(url + 'admin/update-user', {
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