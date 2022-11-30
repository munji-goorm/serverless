import { useState, useEffect } from 'react';
import axios from 'axios';

export const GetStationInfo = (mapLevel, xOne, xTwo, yOne, yTwo) => {

	const [stationData, setStationData] = useState({
		coState: "좋음",
		coValue: 0.5,
		dmX: 37.564639,
		dmY: 126.975961,
		khaiState: "보통",
		khaiValue: 97,
		no2State: "보통",
		no2Value: 0.042,
		o3State: "좋음",
		o3Value: 0.022,
		pm10State: "나쁨",
		pm10Value: 52,
		pm25State: "나쁨",
		pm25Value: 41,
		so2State: "좋음",
		so2Value: 0.003,
		stationName: "중구"
	});

	const url = process.env.REACT_APP_BACKEND_URL;
	const endpoint = '/map'

	/* call Ajax */
	const getStationInfo = async () => {
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
			console.log("-----------called GetStationInfo: 측정소 마커 불러오기-----------");
			console.log(response.data.data);
			setStationData(response.data.data);
		})
		.catch(function(error){
			// handle error
			//alert("서버 오류로 측정소 정보를 가져오지 못했습니다.");
			console.log("서버 오류로 측정소 정보를 가져오지 못했습니다.");
			console.log(error.message);
		})
	};
	
	useEffect(() => {
		getStationInfo();
	}, [xOne, xTwo, yOne, yTwo]);

	return stationData
}
