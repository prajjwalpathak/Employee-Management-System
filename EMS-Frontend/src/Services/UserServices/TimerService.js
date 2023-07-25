import { url } from '../../Constant/Url';

export const UserCheckIn = async (formData) => {
	const response = await fetch(url + 'user/check-in', {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams(formData)
	});

	if (!response.ok) {
		throw new Error('not checked in');
	} else {
		return response.json();
	}
};

export const UserCheckOut = async (formDataOut) => {
	const response = await fetch(url + 'user/check-out', {
		method: 'PUT',
		mode: 'cors',
		credentials: 'include',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams(formDataOut)
	});
	if (!response.ok) {
		throw new Error('not checked out');
	} else {
		return response.json();
	}
};

export const fetchCurrentTime = () => {
	let date = new Date();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();

	if (hours === 24) {
		hours = 0;
	}
	if (hours < 10) {
		hours = '0' + hours;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	if (seconds < 10) {
		seconds = '0' + seconds;
	}

	return hours + ':' + minutes + ':' + seconds;
};
