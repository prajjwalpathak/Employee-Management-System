import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import celebal from '../../Assests/Celebal.png';
import signin from '../../Assests/SignIn.png';
import { userLogin } from '../../Services/UserServices/LoginService';
import bgSvg from '../Spheres.svg';
import { success } from '../../Utils/SuccessToast';
import { Error } from '../../Utils/ErrorToast';
import { serverError } from '../../Utils/ServerToast';
import 'react-toastify/dist/ReactToastify.css';
import './SignIn.css';

function SignIn() {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});
	const [formErrors, setFormErrors] = useState({});
	const [isFilled, setFilled] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (isFilled) {
			userLogin(formData)
				.then(async (response) => {
					const msg = await response.json().then((data) => {
						return data.message;
					});

					if (response.status === 201) {
						navigate('/dashboard');
						// navigate('/table#')
						success(msg);
						localStorage.setItem('loggedInUser', '1');
						setFilled(false);
					} else {
						navigate('/');
						Error(msg);
					}
				})
				.catch((e) => {
					navigate('/');
					serverError();
				});
		}

		return () => {
			setFormData({
				email: '',
				password: ''
			});
			setFilled(false);
		};
	}, [isFilled, navigate]);

	const handleSubmit = (event) => {
		event.preventDefault();

		const errors = {};

		if (!formData.email) {
			errors.email = 'Please enter your email';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.email = 'Please enter a valid email address';
		}

		if (!formData.password) {
			errors.password = 'Please enter a password';
		} else if (formData.password.length < 1) {
			errors.password = 'Password must be at least 8 characters';
		}
		if (Object.keys(errors).length === 0) {
			setFilled(true);
		} else {
			setFormErrors(errors);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	return (
		<>
			<section className='signIn-container position-relative'>
				<div className='signin-wrapper'>
					<div className='left'>
						<div className='logo-title'>
							<div style={{ width: '250px', height: '100px', marginLeft: '0.5rem' }}>
								<img src={celebal} alt='celebal' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
							</div>
							<div style={{ width: '80%', margin: 'auto' }}>
								<p style={{ fontSize: '2rem', color: '#545A78' }}>Welcome Employees!</p>
							</div>
						</div>
						<div style={{ height: '370px', width: '460px' }} className='left-image'>
							<img src={signin} alt='signin' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
						</div>
					</div>
					<div className='right d-flex flex-column justify-content-center'>
						<form id='form' onSubmit={handleSubmit} className='needs-validation' noValidate>
							<div>
								<h1 className='signin-title'>Sign In</h1>
							</div>
							<div>
								<div className='field position-relative'>
									<label htmlFor='email' className='label form-label'>
										Email address
									</label>
									<input
										type='email'
										name='email'
										id='email'
										placeholder='example@celebaltech.com'
										onChange={handleChange}
										value={formData.email}
										className='form-control'
										required
									/>
									{formErrors.email && <span className='error-span'>{formErrors.email}</span>}
								</div>
								<div className='field position-relative'>
									<label htmlFor='password' className='label'>
										Password
									</label>
									<input type='password' name='password' id='password' placeholder='Enter Password' onChange={handleChange} value={formData.password} />

									{formErrors.password && <span className='error-span'>{formErrors.password}</span>}
								</div>
								<div className='last'>
									<div>
										<Link to='/forgotpassword'>Forgot password?</Link>
									</div>
								</div>
								<div></div>
								<div>
									<button
										type='submit'
										style={{
											padding: '0.6rem 2.6rem',
											color: '#fff',
											backgroundColor: '#2563EB',
											border: 'none',
											outline: 'none',
											borderRadius: '6px'
										}}
									>
										Sign In
									</button>
								</div>
								<div>
									<p>
										Don't have an account?<Link to='/signup'>Sign Up</Link>
									</p>
								</div>
							</div>
						</form>
					</div>
				</div>
			</section>
			<div
				style={{
					backgroundColor: '#2563EB',
					zIndex: '-1'
				}}
				className='position-absolute w-100 h-100 top-0 '
			>
				<img src={bgSvg} alt='background' className='w-100 h-100' />
			</div>
		</>
	);
}

export default SignIn;
