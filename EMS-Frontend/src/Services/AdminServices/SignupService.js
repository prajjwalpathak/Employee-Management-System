import { url } from '../../Constant/Url';

export async function adminSignUp(data) {
	const response = await fetch(url + 'admin-signup/', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		credentials: 'include',
		body: new URLSearchParams(data)
	});
	return response.json();
}
