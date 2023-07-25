import React from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';

function SuccessMessage() {
	return (
		<div
			className='message-container'
			style={{
				width: '435px',
				height: '340px',
				borderRadius: '12px',
				backgroundColor: '#FFFFFF',
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%,-50%)',
				boxShadow: '0px 4px 49px 0px #00000040'
			}}
		>
			<div
				style={{
					textAlign: 'center'
				}}
			>
				<BsCheckCircleFill
					style={{
						width: '100px',
						height: '100px',
						fill: 'green',
						paddingTop: '1rem'
					}}
				/>
			</div>
			<p
				style={{
					textAlign: 'center',
					fontSize: '31px',
					lineHeight: '47px',
					fontWeight: '600',
					marginTop: '0.6rem',
					marginBottom: '0',
					color: '#444156'
				}}
			>
				Submitted Successfully
			</p>
			<p
				style={{
					textAlign: 'center',
					fontSize: '20px',
					lineHeight: '30px',
					fontWeight: '200',
					width: '318px',
					margin: '1rem auto',
					paddingBottom: '1rem'
				}}
			>
				Lorem ipsum lorem ipsum lorem ipsum w Lorem ipsum lipsum
			</p>
			<div
				style={{
					textAlign: 'center',
					marginTop: '1rem'
				}}
			>
				<button
					style={{
						border: 'none',
						outline: 'none',
						fontSize: '1rem',
						fontWeight: '700',
						backgroundColor: '#2563EB',
						color: '#fff',
						borderRadius: '9px',
						height: '55px',
						width: '160px',
						lineHeight: '24px',
						letterSpacing: '-0.2%'
					}}
				>
					ok
				</button>
			</div>
		</div>
	);
}

export default SuccessMessage;
