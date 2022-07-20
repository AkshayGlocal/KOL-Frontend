import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useRef } from 'react';
import { useContext } from 'react';
import logo from '../images/GlocalMind-Logo-F.png';
import {UserRoleContext} from '../context/LoginContext'
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

	const formSubmitHandler = (event) => {
		event.preventDefault();
		const enteredName = nameInputRef.current.value;
		const enteredPassword = passInputRef.current.value;
	
		UserRoles.map((e) => {
			if (enteredName === e.username && enteredPassword === e.password) {
				e.isLoggedIn = true;
				userNameCtx.setuserNameHandler(e.username);	
				//console.log("username form "+userNameCtx.username);
			}
		});
		UserRoles.map((e) => {
			if (e.isLoggedIn) {
				navigate(`/${e.username}`);
			}
		});
		if (!UserRoles[0].isLoggedIn && !UserRoles[1].isLoggedIn) {
			window.alert('enter correct password');
		}

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
							<input ref={nameInputRef} type="text" id="username" placeholder="User Name" />
						</div>
						<br />
						<div>
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
