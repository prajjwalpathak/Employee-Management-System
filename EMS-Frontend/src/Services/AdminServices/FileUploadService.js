import { url } from '../../Constant/Url';

export async function bulkData(data) {
	const response = await fetch(url + 'admin/upload-user-details', {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
		body: data
	});

	return response.json();
}
