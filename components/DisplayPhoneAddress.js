import '../css/DisplayPhoneAndLocation.css';
import { useState, useEffect } from 'react';
import phone from '../images/phone.png';
import location from '../images/location.png';
export default function DisplayPhoneAddress(props) {
	let data = props.Results;
	let results = [];
	const [ DisplayPhoneAddress, setDisplayPhoneAddress ] = useState([ {} ]);
	useEffect(
		() => {
			data.map((e) => {
				let tempobj = {};
				tempobj.phone = e.phone.raw;
				tempobj.address1 = e.address1.raw;
				tempobj.address2 = e.address2.raw;
				results.push(tempobj);
			});
			setDisplayPhoneAddress(results);
		},
		[ data ]
	);
	return (
		<div>
			{DisplayPhoneAddress.map((e, index) => (
				<div className="phone-location-container">
					<p><img src={phone} />{e.phone}</p>
					<p><img src={location} />{e.address1} <br /> &emsp; &emsp; &nbsp;{e.address2} </p>
				</div>
			))}
		</div>
	);
}
