import React from 'react';
import { Socket } from '../../Socket';
import { useState, useEffect } from 'react';
import './Timer.css';
import svg from '../../Assests/Pattern.svg';
import { success } from '../../Utils/SuccessToast';
import 'react-toastify/dist/ReactToastify.css';
import { fetchLocation } from '../../Services/UserServices/LocationService';
import { UserCheckIn, UserCheckOut } from '../../Services/UserServices/TimerService';

function Timer() {
	const [timer, setTimer] = useState('00:00:00');
	const [isRunning, setIsRunning] = useState(false);
	const [checkInData, setcheckInData] = useState(null);
	const [checkOutData, setcheckOutData] = useState(null);

	useEffect(() => {
		// Socket.connect();
		Socket.on('startClock', () => {
			Socket.emit('checkin');
		});

		return () => {
			// Socket.disconnect();
			Socket.off('startClock');
			Socket.off('notifications');
			Socket.off('join');
		};
	}, []);

	useEffect(() => {
		Socket.on('status', (data) => {
			if (data.status === 'checked-in') {
				setIsRunning(() => {
					return true;
				});
				setTimer(() => {
					return data.timeDifference;
				});
			} else {
				setIsRunning(() => {
					return false;
				});
				setTimer(() => {
					return '00:00:00';
				});
			}
		});

		return () => {
			Socket.off('status');
			Socket.off('checkin');
			Socket.off('checkout');
			Socket.off('checkedIn');
		};
	}, []);

	const FetchLocation = async () => {
		fetchLocation().then((data) => {
			setcheckInData({
				checkInLocation: data
			});
		});
	};

	const FetchOutLocation = async () => {
		fetchLocation().then((data) => {
			setcheckOutData({
				checkOutLocation: data
			});
		});
	};

	// for checkin
	useEffect(() => {
		if (checkInData) {
			UserCheckIn(checkInData)
				.then((data) => {
					setIsRunning(() => {
						return true;
					});
					Socket.emit('checkedIn');
					Socket.emit('checkin');
					success('Checkin Successfull');
				})
				.catch((e) => {
					console.log(e.message);
				});
		}
	}, [checkInData]);

	// for checkout
	useEffect(() => {
		if (checkOutData) {
			UserCheckOut(checkOutData)
				.then((data) => {
					setIsRunning(() => {
						return false;
					});
					Socket.emit('checkout');
					success('CheckOut Successfull');
					setTimer('00:00:00');
				})
				.catch((e) => {
					console.log(e.message);
				});
		}
		return () => {
			setcheckInData(null);
		};
	}, [checkOutData]);

	const startClock = () => {
		FetchLocation();
	};

	const stopClock = () => {
		FetchOutLocation();
	};

	const reset = () => {
		console.log('reset');
	};

	let [h, m, s] = timer.split(':');

	return (
		<div className='timer-div'>
			<div className='timer-content'>
				<h2 className='heading-greet'>
					<span>Welcome Back!</span>
				</h2>
				<p className='timer-text'>Your today's timer</p>
				<div className='timer-clock'>
					<span className='input'>{h}</span>
					<p className='inputcolon'> : </p>
					<span className='input'>{m}</span>
					<p className='inputcolon'> : </p>
					<span className='input'>{s}</span>
				</div>
				<div className='my-3 stopwatch-buttons'>
					{isRunning ? (
						<button
							className='btn  text-light button'
							onClick={stopClock}
							style={{
								backgroundColor: 'red',
								width: '140px',
								height: '36px',
								padding: '0'
							}}
						>
							Check-Out
						</button>
					) : (
						<button
							className='btn  text-light button'
							onClick={startClock}
							style={{
								backgroundColor: 'green',
								width: '140px',
								height: '36px',
								padding: '0'
							}}
						>
							Check-In
						</button>
					)}

					<button className='btn btn-primary m-2 button' onClick={reset} style={{ width: '140px', height: '36px', padding: '0' }}>
						Break
					</button>
				</div>
			</div>
			<img className='vector-img' src={svg} alt='vector' />
		</div>
	);
}

export default Timer;
