import { url } from '../../Constant/Url';

export const userLogin = async (data) => {
	const response = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		credentials: 'include',
		body: new URLSearchParams(data)
	});

	// return response.json()
	return response;
};
