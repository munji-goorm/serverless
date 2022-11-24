import { useEffect, useState } from 'react';
import axios from 'axios';

export const Coord2TM = (coord) => {
	// 받아온 위도, 경도를 kakaoMap API를 통해 tm좌표로 변환합니다.
	const API_KEY = process.env.REACT_APP_KAKAOMAP_API_KEY_REST;
	const [tm, setTM] = useState({
		tmX: 198167.420154385, //중구 
		tmY: 451311.01317975856, //중구
	});

	const url = "https://dapi.kakao.com/v2/local/geo/transcoord.json";

	const params = {
		x: coord.lng, //경도
		y: coord.lat, //위도
		output_coord: "TM",
	};

	const headers = {
		Authorization: `KakaoAK ${API_KEY}`,
	};

	useEffect(() => {
		const getTM = async () => {
			try {
				const res = await axios.get(url, {
					params: params,
					headers: headers
				})
				setTM({
					tmX: res.data.documents[0]["x"],
					tmY: res.data.documents[0]["y"],
				});
			} catch (e) {
				console.error(e.message);
			}
		}
		getTM();
	}, [coord]);

	return tm
}
