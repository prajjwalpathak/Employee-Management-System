import { url } from '../../Constant/Url';

export const ProfileFormData = async () => {
	const response = await fetch(url + 'user/account/get-user-profile', {
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
export async function updateUserProfileDetails(data) {
	const response = await fetch(url + 'user/account/update-user-profile-details', {
		method: 'PUT',
		credentials: 'include',
		body: new URLSearchParams(data)
	});
	return response.json();
}
export async function updateUserProfileImage(data) {
	const response = await fetch(url + 'user/account/update-user-profile-image', {
		method: 'PUT',
		credentials: 'include',
		body: new URLSearchParams(data)
	});
	return response.json();
}
// getHierarchy

export const getRequest = async (userId) => {
	const response = await fetch(url + `user/get-user-hierarchy?userId=${userId}`, {
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
