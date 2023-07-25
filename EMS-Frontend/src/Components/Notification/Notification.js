import { useState, useEffect, useRef } from 'react';
import { Socket } from '../../Socket';
import { updateUserNotification, updateUserAllNotifications } from '../../Services/UserServices/NotificationService';
import './Notification.css';

export const Notification = ({ messages, unread, closeNotification, setOpenNotification }) => {
	const [notificationId, setNotificationId] = useState({});
	const [allReadData, setAllReadData] = useState({});
	const [notificationRead, setNotificationRead] = useState(false);
	const [allNotificationRead, setAllNotificationRead] = useState(false);
	const notificationRef = useRef(null);

	const handleNotificationClick = (data) => {
		setNotificationId(data);
		setNotificationRead(true);
	};

	const handleAllReadClick = (data) => {
		setAllReadData(data);
		if (unread) {
			setAllNotificationRead(true);
		}
	};

	//for close outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (notificationRef.current && !notificationRef.current.contains(event.target)) {
				setOpenNotification(false);
				document.body.style.overflow = 'visible';
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (notificationRead) {
			updateUserNotification(notificationId)
				.then((data) => {
					Socket.emit('sendNotifications');
					setNotificationRead(false);
				})
				.catch((e) => {
					console.log(e.message);
				});
		}
		return () => {
			Socket.off('sendNotifications');
		};
	}, [notificationRead]);

	useEffect(() => {
		if (allNotificationRead) {
			updateUserAllNotifications(allReadData)
				.then((data) => {
					Socket.emit('sendNotifications');
				})
				.catch((e) => {
					console.log(e.message);
				});
		}
		return () => {
			Socket.off('sendNotifications');
		};
	}, [allNotificationRead]);

	return (
		<div className='notification-messages-div' ref={notificationRef}>
			<div className='notification-messages-heading'>
				<span>Notifications</span>
				<i className='bi bi-x text-danger cross-icon' onClick={closeNotification}></i>
			</div>
			<div className='notification-messages'>
				{messages === undefined ? (
					<div className='no-notification-div'>
						<i className='bi bi-database-exclamation no-notification-icon'></i>
						<span>No notifications available</span>
					</div>
				) : (
					messages.map((message) => {
						return message?.status === 'unread' ? (
							<div
								className='notification-message-card unread-card'
								key={message.id}
								onClick={() => {
									handleNotificationClick({ notificationId: message.notificationId });
								}}
							>
								<span className='notification-logo-span'>
									<i className='bi bi-patch-exclamation text-primary notification-logo-icon'></i>
								</span>
								<div className='notification-content-div unread-bold'>
									<span>{message.content}</span>
									<span className='unread-bold'>
										{new Date(message.date.substr(0, 23) + 'Z').toLocaleString(undefined, {
											day: 'numeric',
											month: 'short',
											year: 'numeric',
											hour: '2-digit',
											minute: '2-digit'
										})}
									</span>
								</div>
							</div>
						) : (
							<div className='notification-message-card' key={message.id}>
								<span className='notification-logo-span'>
									<i className='bi bi-patch-exclamation text-primary notification-logo-icon'></i>
								</span>
								<div className='notification-content-div'>
									<span>{message.content}</span>
									<span className='notification-message-date'>
										{new Date(message.date.substr(0, 23) + 'Z').toLocaleString(undefined, {
											day: 'numeric',
											month: 'short',
											year: 'numeric',
											hour: '2-digit',
											minute: '2-digit'
										})}
									</span>
								</div>
							</div>
						);
					})
				)}
			</div>
			<div className='notification-messages-footer'>
				<button
					className='all-read-btn'
					onClick={() => {
						handleAllReadClick({ hrmid: messages[0].receiver });
					}}
				>
					<span className='check-icon'>
						<i className='bi bi-check2-square'></i>
					</span>
					<span>Mark All As Read</span>
				</button>
			</div>
		</div>
	);
};
