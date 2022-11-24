import React, { useEffect } from 'react';
import { GetLocation, GetStationInfo } from '../../apis';

export const StationMap = ({ name }) => {
	const { kakao } = window;
	let coord = GetLocation();
	//console.log(coord);

	const stationData = GetStationInfo();
	//console.log(stationData);

	let grade;
	let val;

	useEffect(() => {
		const container = document.getElementById('kakaoMap'); // 지도를 표시할 div
		const options = {
			center: new kakao.maps.LatLng(37.564639, 126.975961), // 지도의 중심좌표
			level: 7 // 지도의 확대 레벨
		};
		const map = new kakao.maps.Map(container, options); // 지도를 생성합니다.

		// 이동할 위도 경도 위치를 생성합니다
		var moveLatLon = new kakao.maps.LatLng(coord.lat, coord.lng);
		// 지도 중심을 이동 시킵니다
		map.setCenter(moveLatLon);


		for (let i = 0; i < stationData.length; i++) {
			if (name === "CAI") {
				grade = stationData[i].khaiState;
				val = stationData[i].khaiValue;
			} else if (name === "PM10"){
				grade = stationData[i].pm10State;
				val = stationData[i].pm10Value;
			} else if (name === "PM25"){
				grade = stationData[i].pm25State;
				val = stationData[i].pm25Value;
			} else if (name === "SO2"){
				grade = stationData[i].so2State;
				val = stationData[i].so2Value;
			} else if (name === "NO2"){
				grade = stationData[i].no2State;
				val = stationData[i].no2Value;
			} else if (name === "CO"){
				grade = stationData[i].coState;
				val = stationData[i].coValue;
			} else if (name === "O3"){
				grade = stationData[i].o3State;
				val = stationData[i].o3Value;
			} 

			let imageSrc;
			if (grade === "좋음") {
				imageSrc = process.env.PUBLIC_URL + '/images/markerBlue.png';
			} else if (grade === "보통") {
				imageSrc = process.env.PUBLIC_URL + '/images/markerGreen.png';
			} else if (grade === "나쁨") {
				imageSrc = process.env.PUBLIC_URL + '/images/markerOrange.png';
			} else if (grade === "최악"){
				imageSrc = process.env.PUBLIC_URL + '/images/markerRed.png';
			} else { //점검중
				imageSrc = process.env.PUBLIC_URL + '/images/markerGray.png';
			}
			if (val === -1) {
				val = "점검중";
			}

			// 마커를 생성합니다.
			var marker = new kakao.maps.Marker({
				map: map, // 마커를 표시할 지도
				position: new kakao.maps.LatLng(stationData[i].dmX, stationData[i].dmY), // 마커를 표시할 위치
				title: stationData[i].stationName, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다.
				image: new kakao.maps.MarkerImage(imageSrc, new kakao.maps.Size(50, 35)),
			});

			// 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
			let content = '<div style="color: white; font-size:1rem">' +
				`<span class="title">${val}</span>` +
				'</div>';

			// 커스텀 오버레이를 생성합니다 
			var customOverlay = new kakao.maps.CustomOverlay({
				map: map,
				position: new kakao.maps.LatLng(stationData[i].dmX, stationData[i].dmY),
				content: content,
				yAnchor: 1.34
			});
		}
	});

	return (
		<div id='kakaoMap'
			className='w-[63rem] h-[35rem] rounded-xl'>
		</div>
	);
}
