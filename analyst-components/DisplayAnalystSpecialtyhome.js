//DisplayAnalystSpecialtyhome
import { useState, useEffect, useContext } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { KolIdContext } from '../context/KolIdContext';
import { AreasofInterestsContext } from '../context/AreasOfInterests';
import { SpecialityContext } from '../context/SpecialityContext';
export default function DisplayAnnalystSpecialtyhome(props) {
	let data = props.Results;
	let results = [];
	const [ displayKol, setdisplayKol ] = useState([ {} ]);
	const navigate = useNavigate();
	const KolIdCtx = useContext(KolIdContext);
	const AreasofInterestCtx = useContext(AreasofInterestsContext);
	const SpecialityCtx = useContext(SpecialityContext);
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

	return (
		<div>
			{displayKol.map((e, index) => (
				<div className="Card">
					<h2 style={{ color: '#3259ED', fontFamily: 'Archivo' }}>{e.ID}</h2>
					<div className="Card-field">
					<p>areas_of_interests : {
							e.areas_of_interests && e.areas_of_interests.map((e,index)=>(
								<span className='area-card'>
										<button
											onClick={() => {
												AreasofInterestCtx.setAreasofInterestsHandler(e);
												navigate('/analyst-area');
												
											}}
										>
											
											{e}&#44;&nbsp;
											
										</button>
									</span>
							
							))

						}</p>
						<p>Specialty : {
	
							e.specialty && e.specialty.map((e,index)=>(
								<span className='area-card'>
										<button
											onClick={() => {
												SpecialityCtx.setSpecialityHandler(e);
												navigate('/analyst-specialty');
												
											}}
										>
										{e}&#44;&nbsp;
										</button>
									</span>
							))
							
						}</p>
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
						<button> Request KOL profile</button>
					</div>
				</div>
			))}
		</div>
	);
}
