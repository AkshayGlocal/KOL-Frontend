import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import './logoutbtn.css';
import { useContext } from 'react';
import { NotificationContext } from '../context/Notification';
export default function Logoutbtn() {
	const navigate = useNavigate();
	const HandleClick = () => {
		navigate('/login');
	};
	const NotificationCtx = useContext(NotificationContext);
	return (
		<div className='logout'>
			<div className='notification-profile'>
			<Badge badgeContent={NotificationCtx.Notification} color="primary">
 				 <MailIcon color="action" />
			</Badge>
			</div>
			<button onClick={HandleClick}>Sign out</button>
		</div>

	);
}
