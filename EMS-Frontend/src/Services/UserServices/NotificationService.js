import { url } from '../../Constant/Url';

export const updateUserNotification = async (data) => {
	const response = await fetch(url + 'user/update-user-notification', {
		method: 'PUT',
		credentials: 'include',
		body: new URLSearchParams(data)
	});
	return response.json();
};

export const updateUserAllNotifications = async (data) => {
	const response = await fetch(url + 'user/update-all-user-notifications', {
		method: 'PUT',
		credentials: 'include',
		body: new URLSearchParams(data)
	});
	return response.json();
};
