import { useEffect, useState } from 'react';
import axios from 'axios';

export const GetMainData = (tmX, tmY) => {
	// tm좌표기반의 근접측정소를 조회하고 측정소 이름을 가져옵니다.
	const url = process.env.REACT_APP_BACKEND_URL;
	const endpoint = '/main';
	const API_KEY = process.env.REACT_APP_STATION_API_KEY;

	const [stationName, setStationName] = useState("중구");
	const [stationAddr, setStationAddr] = useState("서울 중구 덕수궁길 15 시청서소문별관 3동");
	const [pollutantData, setPollutantData] = useState({
		forecast: {
		},
		nationwide: {
		},
		stationInfo: {
		},
		nationwideValue: {
		}
	});

	useEffect(() => {
		const getStationName = async () => {
			try {
				const res = await axios.get("http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList", {
					params: {
						serviceKey: API_KEY,
						returnType: "json",
						tmX: tmX,
						tmY: tmY,
					}
				});
				setStationName(res.data.response.body.items[0].stationName);
				setStationAddr(res.data.response.body.items[0].addr);
			} catch (e) {
				console.error(e.message);
			}
		};
		getStationName();

		// 측정소 이름과 주소를 Backend로 전달하고 data를 가져옵니다.
		const getPollutantData = async () => {
			try {
				const res = await axios.get(url + endpoint, {
					params: {
						stationName: encodeURI(stationName),
						addr: encodeURI(stationAddr),
					}
				});
				setPollutantData(res.data.data);
			} catch (e) {
				console.error(e.message);
			}
		}
		getPollutantData();
	}, [tmX, tmY, stationName]);

	return pollutantData
}