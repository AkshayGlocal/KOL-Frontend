import { useState, useEffect, useContext } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { KolIdContext } from '../context/KolIdContext';
import { AreasofInterestsContext } from '../context/AreasOfInterests';
import { SpecialityContext } from '../context/SpecialityContext';
import { AuthContext } from '../context/AuthContext';
import check from '../images/checkarrow.png';
import ApiConstants from '../constants/ApiConstants';
import axios from '../service/axios';

export default function DisplayAnalyst(props){
	let data = props.Results;
	let results = [];
	const [ displayKol, setdisplayKol ] = useState([ {} ]);
	const navigate = useNavigate();
	const KolIdCtx = useContext(KolIdContext);
	const AreasofInterestCtx = useContext(AreasofInterestsContext);
	const SpecialityCtx = useContext(SpecialityContext);
	const AuthCtx = useContext(AuthContext);

	useEffect(
		() => {
			// id: { raw: {} },
			// country:{raw:{}},
			// specialty:{raw:{}},
			// parent_organization:{raw:{}},
			// primary_affiliation:{raw:{}},

			data.map((e) => {
				let tempobj = {};
				tempobj.isClicked = false;
				tempobj.isRequested = false;
				tempobj.ID = e.id.raw;
				tempobj.country = e.country.raw;
				tempobj.specialty = e.specialty.raw;
				tempobj.primary_affiliation = e.primary_affiliation.raw;
				tempobj.parent_organization = e.parent_organization.raw;
				tempobj.areas_of_interests = e.areas_of_interests.raw;

				results.push(tempobj);
			});
			setdisplayKol(results);
		},
		[ data ]
	);
	const viewMoreClick = (index) => {
		const newdisplayKol = [ ...displayKol ];
		newdisplayKol[index].isClicked = true;
		setdisplayKol(newdisplayKol);
	};
	const viewLessClick = (index) => {
		const newdisplayKol = [ ...displayKol ];
		newdisplayKol[index].isClicked = false;
		setdisplayKol(newdisplayKol);
	};

	const RequestProfile = (index,id) =>{
		const newdisplayKol = [...displayKol];
		newdisplayKol[index].isRequested = true;
		setdisplayKol(newdisplayKol);
		console.log("Access Token->"+AuthCtx.Auth.access_token);
		console.log("Refresh Token->"+AuthCtx.Auth.refresh_token);
	 	console.log("Username->"+AuthCtx.Auth.enteredName);
		console.log("ID->"+id);
		
		// get method to uri api/v1/users
		// header Authorization add Bearer + access_token
		
		const sendToBackend = async()=>{
		const access_token = AuthCtx.Auth.access_token;
		const options = {
			method:'GET',
			headers:{
				"Content-type": "application/json",
				'Authorization':'Bearer '+access_token,
				
			},
			url:ApiConstants.USERS_LISt,
		};
		try{
			const response = await axios(options);
			console.log("IN TRY "+response);
		}catch(error){
			console.log(error);
		}
	}
		sendToBackend();

	}
	return (
		<div>
			{displayKol.map((e, index) => (
				<div className="Card">
					<h2 style={{ color: '#3259ED', fontFamily: 'Archivo' }}>{e.ID}</h2>
					<div className="Card-field">
						<p>
							areas_of_interests :{' '}
							{e.areas_of_interests &&
								e.areas_of_interests.map((e, index) => (
									<span className="area-card">
										<button
											onClick={() => {
												AreasofInterestCtx.setAreasofInterestsHandler(e);
												navigate('/analyst-areahome');
											}}
										>
											{e}&#44;&nbsp;
										</button>
									</span>
								))}
						</p>
						<p>
							Specialty :{' '}
							{e.specialty &&
								e.specialty.map((e, index) => (
									<span className="area-card">
										<button
											onClick={() => {
												SpecialityCtx.setSpecialityHandler(e);
												navigate('/analyst-specialtyhome');
											}}
										>
											{e}&#44;&nbsp;
										</button>
									</span>
								))}
						</p>
						<p>Country : {e.country}</p>
						{e.isClicked ? null : (
							<button
								onClick={() => {
									viewMoreClick(index);
								}}
							>
								View more
							</button>
						)}
						{e.isClicked ? (
							<div>
								<p>Primary Affiliation :{e.primary_affiliation}</p>
								<p>Parent Organization : {e.parent_organization}</p>
								<button
									onClick={() => {
										viewLessClick(index);
									}}
								>
									View Less
								</button>
							</div>
						) : null}
						{e.isRequested ? (
							<div className='profile-requested'>
								<p><img src={check}  alt='check'/>
									Profile Requested</p>
								
							</div>
						):(
							<button
						className='request-button'
							onClick={() => {
								RequestProfile(index,e.ID);
							}}
						>
							{' '}
							Request KOL profile
						</button>	
						
						)
						}	

					</div>
				</div>
			))}
		</div>
	);
 }