import { useEffect, useState } from 'react';
import '../css/DisplayImage.css';

export function DisplayImage(props) {
	let data = props.Results;
	let results = [];
	const [ displayImage, setdisplayImage ] = useState([ {} ]);
	useEffect(
		() => {
			data.map((e) => {
				let tempobj = {};
				tempobj.id = e.id.raw;
				tempobj.image_link = e.image_link.raw;
				tempobj.kol_name = e.kol_name.raw;
				tempobj.id_kol = e.id_kol.raw;
				tempobj.source_link = e.source_link.raw;
				results.push(tempobj);
			});
			setdisplayImage(results);
		},
		[data]
	);
	return (
		<div>
			{displayImage.map((e, index) => (
				<div className="image-cont">
					<img className="image" src={e.image_link} alt={'doctor-image'} />
				</div>
			))}
		</div>
	);
}
