import { url } from '../../Constant/Url';

export const UserSearchBar = async () => {
	const response = await fetch(url + 'user/get-all-users', {
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

export const GetUserId = async (userId) => {
	const response = await fetch(url + `user/get-searched-user?userId=${userId}`, {
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
