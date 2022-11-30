import React, { useEffect, useState } from 'react';
import { GetCCTVInfo } from '../../apis';

export const CCTVMap = ({ coord }) => {
	const { kakao } = window;
	const [map, setMap] = useState(null);
	const [markers, setMarkers] = useState([]);

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

	let cctvs = GetCCTVInfo(zoomLevel, swLatlng.xOne, neLatlng.xTwo, swLatlng.yOne, neLatlng.yTwo); //cctv 정보를 불러옵니다.

	function addMarker(List) {
		// 지도 이동 후 새로운 마커 배열을 담을 변수 선언
		let markerArr = [];

		// 마커 이미지
		let imageSrc = process.env.PUBLIC_URL + 'images/cctvMarker.png';
		let imageSize = new kakao.maps.Size(15, 15);

		if (List !== null) {
			for (let i = 0; i < List.length; i++) {
				/* 마커 정보 설정 */
				let newMarker = new kakao.maps.Marker({
					map: map,
					position: new kakao.maps.LatLng(List[i].XCoord, List[i].YCoord),
					title: List[i].cctvName,
					image: new kakao.maps.MarkerImage(imageSrc, imageSize),
					clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
				});

				/* cctv 새창에서 띄우기 */
				let cctv_Url = List[i].cctv_Url;
				kakao.maps.event.addListener(newMarker, 'click', function () {
					let width = 320;
					let height = 300;
					let left = (window.screen.width / 2) - (320 - 2);
					let top = (window.screen.height / 2) - (300 - 2)
					const windowFeatures = `left=${left},top=${top},width=${width},height=${height}`;
					window.open(cctv_Url, "_blank", windowFeatures); // 새창에서 열림
				});

				markerArr.push(newMarker);
			}

			/* 기존 마커 삭제 후 새로운 마커 찍기 */
			setMarkers(markers => {
				markers.forEach(marker => marker.setMap(null));
				return markerArr;
			})
		} else { //지도 줌레벨이 11~14 일 때는 마커 찍지 않음
			setMarkers(markers => {
				markers.forEach(marker => marker.setMap(null));
				return [];
			})
		}
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

	/* 보이는 지도 영역 내의 cctv 마커를 표시합니다. */
	useEffect(() => {
		addMarker(cctvs);
	}, [cctvs]);

	return (
		<div id='kakaoMap'
			className='w-[63rem] h-[35rem] rounded-xl'>
		</div>
	);
}