import { useState, useEffect } from 'react';
import axios from 'axios';

export const Coord2address = (coord) => {
	// 위도, 경도를 kakaoMap API를 통해 주소로 변환합니다.
	const API_KEY = process.env.REACT_APP_KAKAOMAP_API_KEY_REST;
	
	const [addr, setAddr] = useState("중구 서소문동");
	
	const url = "https://dapi.kakao.com/v2/local/geo/coord2address.json";

	const params = {
		x: coord.lng, //경도
		y: coord.lat, //위도
		input_coord: "WGS84",
	};

	const headers = {
		Authorization: `KakaoAK ${API_KEY}`,
	};

	useEffect(() => {
		const getAddr = async () => {
			try {
				const res = await axios.get(url, {
					params: params,
					headers: headers
				})
				setAddr(res.data.documents[0].address["region_2depth_name"] + ' ' + res.data.documents[0].address["region_3depth_name"]);
			} catch (e) {
				console.error(e.message);
			}
		};
		getAddr();
	}, [coord]);
	
	return addr
}
