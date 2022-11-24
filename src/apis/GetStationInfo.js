import { useState, useEffect } from 'react';
import axios from 'axios';

export const GetStationInfo = () => {

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

	useEffect(() => {
		const getStationInfo = async () => {
			try {
				const res = await axios.get(url + endpoint);
				setStationData(res.data.data);
			} catch (e) {
				console.error(e.message);
			}
		};
		getStationInfo();
	}, [])

	return stationData
}
