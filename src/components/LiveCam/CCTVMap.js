import React, { useEffect } from 'react';
import { GetCCTVInfo, GetLocation } from '../../apis';

export const CCTVMap = () => {
	const { kakao } = window;
	let coord = GetLocation();
	const CCTVData = GetCCTVInfo();

	let imageSrc = process.env.PUBLIC_URL + 'images/cctvMarker.png';
	let imageSize = new kakao.maps.Size(15, 15);

	useEffect(() => {
		const container = document.getElementById('kakaoMap'); // 지도를 표시할 div
		const options = {
			center: new kakao.maps.LatLng(37.584009, 126.970626), // 지도의 중심좌표
			level: 7 // 지도의 확대 레벨
		};
		const map = new kakao.maps.Map(container, options); // 지도를 생성합니다.

		// 이동할 위도 경도 위치를 생성합니다
		var moveLatLon = new kakao.maps.LatLng(coord.lat, coord.lng);
		// 지도 중심을 이동 시킵니다
		map.setCenter(moveLatLon);


		for (let i = 0; i < CCTVData.length; i++) {
			// 마커를 생성합니다.
			let marker = new kakao.maps.Marker({
				map: map,
				position: new kakao.maps.LatLng(CCTVData[i].xCoord, CCTVData[i].yCoord),
				title: CCTVData[i].cctvName,
				image: new kakao.maps.MarkerImage(imageSrc, imageSize),
				clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
			});

			let cctv_Url = CCTVData[i].cctv_Url;
			kakao.maps.event.addListener(marker, 'click', function () {
				let width = 320;
				let height = 300;
				let left = (window.screen.width / 2) - (320 -2);
				let top = (window.screen.height / 2) - (300 -2)
				const windowFeatures = `left=${left},top=${top},width=${width},height=${height}`;
				window.open(cctv_Url, "_blank", windowFeatures); // 새창에서 열림
				map.setCenter(marker.getPosition()); // cctv 마커 클릭 시 마커 위치로 중심좌표 이동
			});
		}
	});

	return (
		<div id='kakaoMap'
			className='w-[63rem] h-[35rem] rounded-xl'>
		</div>
	);
}