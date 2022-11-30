import { useEffect, useState } from 'react';
import axios from 'axios';

/** CCTV data를 불러옵니다. */
export const GetCCTVInfo = (mapLevel, xOne, xTwo, yOne, yTwo) => {

	const [cctv, setCctv] = useState({
		cctvName: "상암사거리",
		cctv_Url: "http://www.utic.go.kr/view/map/cctvStream.jsp?cctvid=L010001&cctvName=상암사거리&kind=Seoul&cctvip=null&cctvch=51&id=1&cctvpasswd=null&cctvport=null",
		xCoord: 37.57308,
		yCoord: 126.89889,
	});

	const url = process.env.REACT_APP_BACKEND_URL;
	const endpoint = '/cctv';

	/* call Ajax */
	const getData = async () => {
		await axios.get(url + endpoint, {
			params: {
				mapLevel: mapLevel,
				xOne: xOne,
				xTwo: xTwo,
				yOne: yOne,
				yTwo: yTwo,
			}
		})
		.then(function(response){
			// handle success
			console.log("-----------called GetCCTVInfo: CCTV 마커 불러오기-----------");
			console.log(response.data.data);
			setCctv(response.data.data);
		})
		.catch(function(error){
			// handle error
			//alert("서버 오류로 CCTV 데이터를 가져오지 못했습니다.");
			console.log("서버 오류로 CCTV 데이터를 가져오지 못했습니다.");
		})
	}
	
	useEffect(() => {
		getData();
	}, [xOne, xTwo, yOne, yTwo]);

	return cctv
}
