import { useRef, useEffect, useState } from 'react';
import OrgChart from '@balkangraph/orgchart.js';
import './Profile.css';
import { getRequest } from '../../Services/UserServices/ProfileService';
import { useSearchParams } from 'react-router-dom';

const Hierarchy = (props) => {
	const currentRef = useRef();

	const [searchParams] = useSearchParams();
	const userId = searchParams.get('userId');
	const [hire, setHire] = useState(null);

	useEffect(() => {
		getRequest(userId).then((data) => {
			setHire(data);
		});
	}, []);

	useEffect(() => {
		OrgChart.templates.ana.plus = '';
		OrgChart.templates.ana.minus = '';

		if (hire) {
			new OrgChart(currentRef.current, {
				nodes: hire,
				enableSearch: false,
				mouseScrool: OrgChart.action.none,
				nodeMouseClick: OrgChart.action.none,
				template: 'ula',

				toolbar: {
					zoom: true,
					fit: true
				},
				tags: {
					'node-with-subtrees': {
						template: 'group',
						subTreeConfig: {
							siblingSeparation: 10,
							columns: 3
						}
					}
				},

				nodeBinding: {
					field_0: 'name',
					field_1: 'role',
					img_0: 'profileImage'
				}
			});
		}
	}, [hire]);

	return (
		<>
			<div id='tree' ref={currentRef} style={{ marginBottom: '0.9rem' }}></div>
		</>
	);
};

export default Hierarchy;
