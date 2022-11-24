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
			// content HTMLElement 생성
			var content = document.createElement('div');
			// 닫기 버튼 생성
			var closeBtn = document.createElement('button');
			closeBtn.style.backgroundColor = "#31333E";
			closeBtn.style.color = "white";
			closeBtn.style.position = "relative";
			closeBtn.style.bottom = "-1.7rem";
			closeBtn.style.left = "18.3rem";
			closeBtn.style.border = "solid #24252D";
			closeBtn.style.width = "1.3rem";
			closeBtn.style.height = "1.3rem";
			closeBtn.style.display = "flex";
			closeBtn.style.alignItems = "center";
			closeBtn.style.justifyContent = "center";
			closeBtn.appendChild(document.createTextNode('x'));
			content.appendChild(closeBtn);
			// cctv iframe 생성
			let video = document.createElement('iframe');
			video.width = "320";
			video.height = "300";
			video.frameborder= "0";
			video.src = cctv_Url;
			content.appendChild(video);

			// 닫기 이벤트 추가
			closeBtn.onclick = function () {
				overlay.setMap(null);
			};

			// 마커 위에 커스텀오버레이를 표시합니다
			// 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
			let overlay = new kakao.maps.CustomOverlay({
				content: content,
				map: map,
				position: marker.getPosition()
			});
			overlay.setMap(null); // 마커를 클릭하기 전에는 표시하지 않습니다
			// 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
			kakao.maps.event.addListener(marker, 'click', function () {
				overlay.setMap(map);
				map.setCenter(marker.getPosition()); // cctv 마커 클릭 시 마커 위치로 중심좌표 이동
			});

			// 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
			function closeOverlay() {
				overlay.setMap(null);
			}
		}
	});

	return (
		<div id='kakaoMap'
			className='w-[63rem] h-[35rem] rounded-xl'>
		</div>
	);
}