import { useState, useEffect } from 'react';

/** Geolocation API - 사용자 현재 위치(위도, 경도)를 불러옵니다. */
export const GetLocation = () => {
	let lat, lng; //위도, 경도
	const [location, setLocation] = useState();

	/* Geolocation 호출 성공 */
	const onSuccess = (location) => {
		lat = location.coords.latitude;
		lng = location.coords.longitude;
		setLocation({
			lat,
			lng,
		});
		console.log("-----------success geolocation API-----------");
		console.log(lat, lng);
	}

	/* Geolocation 호출 실패 */
	const onError = (error) => {
		alert("일시적으로 내 위치를 확인할 수 없습니다. 지역검색 버튼을 통해 원하는 지역을 선택하여 대기 오염을 확인할 수 있습니다.");
		console.log("-----------failed geolocation API-----------");
		console.log(error);
	}

	useEffect(() => {
		const { geolocation } = navigator;

		// 사용자 브라우저에서 Geolocation이 정의되지 않은 경우 오류로 처리합니다.
		if (!geolocation) {
			alert("Geolocation is not supported.");
		}

		// Geolocation API 호출
		geolocation.getCurrentPosition(onSuccess, onError, {
			enableHighAccuracy: false,
			maximumAge: 1000 * 3600 * 24, //24h
			timeout: 5000, //5sec
		});
	}, []);

	return location
}