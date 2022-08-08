import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useRef } from 'react';
import { useContext } from 'react';
import logo from '../images/GlocalMind-Logo-F.png';
import {UserRoleContext} from '../context/LoginContext'
import ApiConstants from '../constants/ApiConstants';
import axios from '../service/axios';
import qs from 'qs';
import jwtDecode from 'jwt-decode';

export default function Login() {

	const userNameCtx = useContext(UserRoleContext);
	const navigate = useNavigate();
	const nameInputRef = useRef();
	const passInputRef = useRef();
	const UserRoles = [
		{
			username: 'admin',
			password: 'glocalmind',
			isLoggedIn: false
		},
		{
			username: 'analyst',
			password: 'glocalmind',
			isLoggedIn: false
		}
	];

	const formSubmitHandler = async (event) => {
		event.preventDefault();
		const enteredName = nameInputRef.current.value;
		const enteredPassword = passInputRef.current.value;
		// const params = new URLSearchParams();
		// params.append('username', enteredName);
		// params.append('password', enteredPassword);	
		const data ={
			"username":enteredName,
			"password":enteredPassword,
		}
		const options = {
			method: 'POST',
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
			data: qs.stringify(data),
			url:ApiConstants.LOGIN_URL,
		  };
		  try {
			const response = await axios(options);
			// console.log(JSON.stringify(response?.data));
			const access_token = response?.data?.access_token;
			const s =jwtDecode(access_token);
			const roles = s.roles;

			
			console.log(...roles);
			console.log(access_token);
		} catch (error) {
			console.log(error);		
		}


		// UserRoles.map((e) => {
		// 	if (enteredName === e.username && enteredPassword === e.password) {
		// 		e.isLoggedIn = true;
		// 		userNameCtx.setuserNameHandler(e.username);	
		// 		//console.log("username form "+userNameCtx.username);
		// 	}
		// });
		// UserRoles.map((e) => {
		// 	if (e.isLoggedIn) {
		// 		navigate(`/${e.username}`);
		// 	}
		// });
		// if (!UserRoles[0].isLoggedIn && !UserRoles[1].isLoggedIn) {
		// 	window.alert('enter correct password');
		// }

		//window.alert('enter correct password');
	};

	return (
		<>
			
			<div className="header">
			<div className="inner-header flex">
			<div className="body-login">
			<div className="body-login-align">
				<div className='card-login'>
				<img src={logo} alt={"glocalmind"}/>
					<form onSubmit={formSubmitHandler}>
						<div>
							<label htmlFor='username' id='username'></label>
							<input ref={nameInputRef} type="text" id="username" placeholder="User Name" />
						</div>
						<br />
						<div>
							<label htmlFor='password' id='password'></label>
							<input ref={passInputRef} type="password" id="password" placeholder="Password" />
						</div>
						<br />
						<div className="Login-btn">
							<button>Sign In</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		

			</div>

			<div>
			<svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
			viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
			<defs>
			<path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
			</defs>
			<g className="parallax">
			<use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
			<use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
			<use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
			<use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
			</g>
			</svg>
			</div>

			</div>
		</>
		
	);
}
