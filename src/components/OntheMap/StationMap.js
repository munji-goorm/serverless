import React, { useEffect, useState } from 'react';
import { GetStationInfo } from '../../apis';

export const StationMap = ({ coord, name }) => {
	const { kakao } = window;
	const [map, setMap] = useState(null);
	const [markers, setMarkers] = useState([]);
	const [overlay, setOverlay] = useState([]);

	//지도의 줌(확대,축소)레벨
	const [zoomLevel, setZoomLevel] = useState(7);

	//SouthWest 남서쪽 위도, 경도
	const [swLatlng, setSwLatLng] = useState({
		xOne: 0,
		yOne: 0,
	});

	//NorthEast 북동쪽 위도, 경도
	const [neLatlng, setNeLatLng] = useState({
		xTwo: 0,
		yTwo: 0,
	});

	let stations = GetStationInfo(zoomLevel, swLatlng.xOne, neLatlng.xTwo, swLatlng.yOne, neLatlng.yTwo); //측정소 정보를 불러옵니다.

	function addMarker(List) {
		// 지도 이동 후 새로운 마커, 오버레이 배열을 담을 변수 선언
		let markerArr = [];
		let overlayArr = [];

		let grade, val, imageSrc; //등급, 수치, 마커이미지
		for (let i=0; i < List.length; i++){
			/* 오염 물질에 따라 등급과 수치 설정하기 */
			if (name === "CAI") {
				grade = List[i].khaiState;
				val = List[i].khaiValue;
			} else if (name === "PM10") {
				grade = List[i].pm10State;
				val = List[i].pm10Value;
			} else if (name === "PM25") {
				grade = List[i].pm25State;
				val = List[i].pm25Value;
			} else if (name === "SO2") {
				grade = List[i].so2State;
				val = List[i].so2Value;
			} else if (name === "NO2") {
				grade = List[i].no2State;
				val = List[i].no2Value;
			} else if (name === "CO") {
				grade = List[i].coState;
				val = List[i].coValue;
			} else if (name === "O3") {
				grade = List[i].o3State;
				val = List[i].o3Value;
			}
			if (val === -1) {
				val = "점검중";
			}
	
			/* 등급에 따라 마커 이미지(색상) 설정하기 */
			if (grade === "좋음") {
				imageSrc = process.env.PUBLIC_URL + '/images/markerBlue.png';
			} else if (grade === "보통") {
				imageSrc = process.env.PUBLIC_URL + '/images/markerGreen.png';
			} else if (grade === "나쁨") {
				imageSrc = process.env.PUBLIC_URL + '/images/markerOrange.png';
			} else if (grade === "최악") {
				imageSrc = process.env.PUBLIC_URL + '/images/markerRed.png';
			} else { //점검중
				imageSrc = process.env.PUBLIC_URL + '/images/markerGray.png';
			}

			/* 마커 정보 설정 */
			let newMarker = {
				map: map,
				position: new kakao.maps.LatLng(List[i].dmX, List[i].dmY), // 마커를 표시할 위치
				title: List[i].stationName, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다.
				image: new kakao.maps.MarkerImage(imageSrc, new kakao.maps.Size(50, 35)),
			};

			/* 커스텀 오버레이를 생성합니다. */
			//커스텀 오버레이에 표출될 내용입니다.(측정 수치 또는 점검중)
			let content = '<div style="color: white; font-size:1rem">' +
				`<span class="title">${val}</span>` +
				'</div>';

			let newOverlay = {
				map: map,
				position: new kakao.maps.LatLng(List[i].dmX, List[i].dmY),
				content: content,
				yAnchor: 1.34
			}

			markerArr.push(newMarker);
			overlayArr.push(newOverlay);
		}

		/* 새로 찍을 마커&오버레이 배열 만들기 */
		const newMarkers = markerArr.map(marker => 
			new kakao.maps.Marker(marker)
		);

		const newOverlays = overlayArr.map(overlay =>
			new kakao.maps.CustomOverlay(overlay)
		);
		
		/* 기존 마커&오버레이 삭제 후 새로운 마커&오버레이 찍기 */
		setMarkers(markers => {
			markers.forEach(marker => marker.setMap(null));
			return newMarkers;
		});

		setOverlay(overlays => {
			overlays.forEach(overlay => overlay.setMap(null));
			return newOverlays;
		});
	}

	/**맨 처음 지도 생성하기 */
	useEffect(() => {
		const container = document.getElementById('kakaoMap'); //지도를 표시할 div
		const options = {
			center: new kakao.maps.LatLng(coord.lat, coord.lng), //지도의 중심좌표
			level: 7 //지도의 확대 레벨
		};
		const kakaoMap = new kakao.maps.Map(container, options); //지도를 생성합니다.

		//지도 영역정보를 얻어옵니다 
		var bounds = kakaoMap.getBounds();
		//영역정보의 남서쪽 정보를 얻어옵니다 
		var swLatlng = bounds.getSouthWest();
		setSwLatLng({
			xOne: swLatlng.Ma, //남서쪽 위도
			yOne: swLatlng.La, //남서쪽 경도
		});
		//영역정보의 북동쪽 정보를 얻어옵니다 
		var neLatlng = bounds.getNorthEast();
		setNeLatLng({
			xTwo: neLatlng.Ma, //북동쪽 위도
			yTwo: neLatlng.La, //북동쪽 경도
		});

		// 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다
		var zoomControl = new kakao.maps.ZoomControl();
		kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

		// 마우스 드래그로 지도 이동이 완료되었을 때 남서쪽과 북동쪽 위도/경도를 새로 설정합니다.
		kakao.maps.event.addListener(kakaoMap, 'dragend', function () {
			//지도 영역정보를 얻어옵니다 
			var bounds = kakaoMap.getBounds();
			//영역정보의 남서쪽 정보를 얻어옵니다 
			var swLatlng = bounds.getSouthWest();
			setSwLatLng({
				xOne: swLatlng.Ma, //남서쪽 위도
				yOne: swLatlng.La, //남서쪽 경도
			});

			//영역정보의 북동쪽 정보를 얻어옵니다 
			var neLatlng = bounds.getNorthEast();
			setNeLatLng({
				xTwo: neLatlng.Ma, //북동쪽 위도
				yTwo: neLatlng.La, //북동쪽 경도
			});
		});

		// 지도가 확대 또는 축소되면 줌레벨, 남서쪽과 북동쪽 위도/경도를 새로 설정합니다.
		kakao.maps.event.addListener(kakaoMap, 'zoom_changed', function () {
			//지도 영역정보를 얻어옵니다 
			var bounds = kakaoMap.getBounds();
			//영역정보의 남서쪽 정보를 얻어옵니다 
			var swLatlng = bounds.getSouthWest();
			setSwLatLng({
				xOne: swLatlng.Ma, //남서쪽 위도
				yOne: swLatlng.La, //남서쪽 경도
			});

			//영역정보의 북동쪽 정보를 얻어옵니다 
			var neLatlng = bounds.getNorthEast();
			setNeLatLng({
				xTwo: neLatlng.Ma, //북동쪽 위도
				yTwo: neLatlng.La, //북동쪽 경도
			});

			//줌레벨을 설정합니다.
			setZoomLevel(kakaoMap.getLevel());
		});

		setMap(kakaoMap);
	}, []);

	/**현재 위도, 경도에 따라 지도의 중심좌표, 남서쪽, 북동쪽 좌표 변경*/
	useEffect(() => {
		if (map) { //kakaoMap이 렌더링되면 실행합니다.
			/* 지도 중심좌표 이동 */
			var moveLatLon = new kakao.maps.LatLng(coord.lat, coord.lng);
			map.setCenter(moveLatLon);

			/* 지도 영역정보 얻어오기 */
			let bounds = map.getBounds();
			let swLatlng = bounds.getSouthWest(); //영역정보의 남서쪽 정보를 얻어옵니다 
			setSwLatLng({
				xOne: swLatlng.Ma, //남서쪽 위도
				yOne: swLatlng.La, //남서쪽 경도
			});
			let neLatlng = bounds.getNorthEast(); //영역정보의 북동쪽 정보를 얻어옵니다 
			setNeLatLng({
				xTwo: neLatlng.Ma, //북동쪽 위도
				yTwo: neLatlng.La, //북동쪽 경도
			});
		}
	}, [coord]);


	/* 보이는 지도 영역 내의 측정소 마커를 표시합니다. */
	useEffect(() => {
		addMarker(stations);
	}, [stations, name]);

	return (
		<div id='kakaoMap'
			className='w-[63rem] h-[35rem] rounded-lg'>
		</div>
	);
}
