import { io } from 'socket.io-client';
import { url } from './Constant/Url';

export const Socket = io(url, {
	withCredentials: true,
	reconnection: true,
	reconnectionDelay: 1000,
	reconnectionDelayMax: 5000,
	reconnectionAttempts: Infinity
});
