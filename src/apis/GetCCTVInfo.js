import { useEffect, useState } from 'react';
import axios from 'axios';

export const GetCCTVInfo = () => {
	const [CCTVData, setCCTVData] = useState({
		cctvName: "상암사거리",
		cctv_Url: "http://www.utic.go.kr/view/map/cctvStream.jsp?cctvid=L010001&cctvName=상암사거리&kind=Seoul&cctvip=null&cctvch=51&id=1&cctvpasswd=null&cctvport=null",
		xCoord: 37.57308,
		yCoord: 126.89889,
	});

	const url = process.env.REACT_APP_BACKEND_URL;
	const endpoint = '/cctv';

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await axios.get(url + endpoint);
				//console.log(res.data.data);
				setCCTVData(res.data.data);
			} catch (e) {
				console.error(e.message);
			}
		}
		getData();
	}, [])

	return CCTVData
}
