import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import celebal from '../../Assests/Celebal.png';
import signin from '../../Assests/SignIn.png';
import bgSvg from '../Spheres.svg';
import { userSignUp } from '../../Services/UserServices/SignUpService';
import { success } from '../../Utils/SuccessToast';
import { Error } from '../../Utils/ErrorToast';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		agreement: false
	});

	const [formErrors, setFormErrors] = useState({});

	const handleSubmit = (event) => {
		event.preventDefault();

		const errors = {};

		if (!formData.name) {
			errors.name = 'Please enter your name';
		}

		if (!formData.email) {
			errors.email = 'Please enter your email';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.email = 'Please enter a valid email address';
		}

		if (!formData.password) {
			errors.password = 'Please enter a password';
		} else if (formData.password.length < 3) {
			errors.password = 'Password must be at least 3 characters';
		}

		// if(!formData.agreement){
		//     errors.agreement='You must agree to  terms & conditions'
		// }

		setFormErrors(errors);
		const bodyData = formData;

		userSignUp(bodyData)
			.then((data) => {
				if (data.message === 'User created successfully') {
					navigate('/');
					success(data.message);
				} else {
					navigate('/signup');
					Error('User Already Exist!');
				}
			})
			.catch((e) => {
				console.log(e.message);
				navigate('/signup');
				Error('Server Down!');
			});
	};

	const handleChange = (event) => {
		const { name, value, type, checked } = event.target;
		const newValue = type === 'checkbox' ? checked : value;
		setFormData((prevState) => ({ ...prevState, [name]: newValue }));
	};

	return (
		<>
			<section className='signIn-container signup-container' style={{ height: '100vh' }}>
				<div className='signup-wrapper '>
					<div className='left'>
						<div className='logo-title'>
							<div style={{ width: '250px', height: '100px' }}>
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
						<form id='form' onSubmit={handleSubmit}>
							<div>
								<h1 className='signin-title'>Sign up</h1>
							</div>
							<div>
								<div className='field position-relative'>
									<label htmlFor='fullname' className='label' style={{ padding: '0.3rem 0' }}>
										Full Name
									</label>
									<input type='text' name='name' id='fullname' placeholder='Full Name' onChange={handleChange} value={formData.name} />
									{formErrors.name && <span className='error-span'>{formErrors.name}</span>}
								</div>
								<div className='field position-relative'>
									<label htmlFor='email' className='label' style={{ padding: '0.3rem 0' }}>
										Email
									</label>
									<input type='email' name='email' id='email' placeholder='Email' onChange={handleChange} value={formData.email} />
									{formErrors.email && <span className='error-span'>{formErrors.email}</span>}
								</div>

								<div className='field position-relative'>
									<label htmlFor='password' className='label' style={{ padding: '0.3rem 0' }}>
										Password
									</label>
									<input type='password' name='password' id='password' placeholder='Password' onChange={handleChange} value={formData.password} />
									{formErrors.password && <span className='error-span'>{formErrors.password}</span>}
								</div>

								{/*  <div className='last position-relative'>

                            <div>
                                <input type='checkbox' name="agreement" id="agreement" onChange={handleChange} checked={formData.agreement}></input>
                                <span style={{paddingLeft:'0.5rem'}}>Agree terms & conditions</span>
                                {formErrors.agreement && <p className='error-span agreement-error'>{formErrors.agreement}</p>}
                            </div>
                        </div> */}

								<div></div>
								<div style={{ margin: '1rem 0' }}>
									<button type='submit' style={{ padding: '0.6rem 2.6rem', color: '#fff', backgroundColor: '#2563EB', border: 'none', outline: 'none', borderRadius: '6px' }}>
										Sign up
									</button>
								</div>
								<div>
									<p>
										already have an account?<Link to='/'>Sign in</Link>
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
};

export default SignUp;
