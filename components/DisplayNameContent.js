import '../css/DisplayNameContent.css';
import { useEffect,useState } from "react";
export default function DisplayNameContent(props){
    let data = props.Results;
	let results = [];
	const [ DisplayNameContent, setDisplayNameContent ] = useState([ {} ]);
	useEffect(
		() => {
			data.map((e) => {
				let tempobj = {};
				tempobj.kol_name = e.kol_name.raw;
				tempobj.suffix = e.suffix.raw;
				tempobj.specialty =e.specialty.raw;
                tempobj.areas_of_interests = e.areas_of_interests.raw;
				results.push(tempobj);
			});
			setDisplayNameContent(results);
		},
		[ data ]
	);
	return (
		<div>
			{DisplayNameContent.map((e, index) => (
				<div className="name-content-wrapper">
                    <p className='name'>{e.kol_name} <span className='suffix'>{e.suffix}</span></p>
                    <p>{e.specialty} <br /> {e.areas_of_interests}</p>
                </div>
			))}
		</div>
	);
}