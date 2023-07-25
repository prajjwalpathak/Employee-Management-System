import { url } from '../../Constant/Url';

export const userSignUp = async (data) => {
	const response = await fetch(url + 'signup/', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		credentials: 'include',
		body: new URLSearchParams(data)
	});
	return response.json();
};
