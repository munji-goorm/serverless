import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppIcon from '../../assets/images/goodMunji.png';
import { ReactComponent as LocationIcon } from '../../assets/icons/location.svg';
import { ReactComponent as DropDownArrowIcon } from '../../assets/icons/dropDownArrow.svg';
import { SearchBox } from './SearchBox';
import axios from 'axios';

export default function Header({ shortAddr, setShortAddr, setFullAddr, setCoord }) {
	const [searchBtn, setSearchBtn] = useState(true);
	const header = useRef();
	const location = useLocation();

	/** Geolocation API - 사용자 현재 위치(위도, 경도)를 불러옵니다. */
	//Geolocation 호출 성공
	const onSuccess = (location) => {
		let lat = location.coords.latitude;
		let lng = location.coords.longitude;
		// console.log("-----------success geolocation API-----------");
		// console.log(lat, lng);
		setCoord({
			lat: lat,
			lng: lng,
		});
		coord2addr({ lat: lat, lng: lng });
		localStorage.setItem('userXCoord', lat);
		localStorage.setItem('userYCoord', lng);
	}

	//Geolocation 호출 실패
	const onError = (error) => {
		alert("일시적으로 내 위치를 확인할 수 없습니다. 지역검색 버튼을 통해 원하는 지역을 선택하여 대기 오염을 확인할 수 있습니다.");
		// console.log("-----------failed geolocation API-----------");
		// console.log(error);
	}

	//위도, 경도로 주소를 가져옵니다.
	const coord2addr = async (coord) => {
		const url = "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json";
		const params = {
			x: coord.lng, //경도
			y: coord.lat, //위도
			input_coord: "WGS84",
		}
		const headers = {
			Authorization: `KakaoAK ${process.env.REACT_APP_KAKAOMAP_API_KEY_REST}`,
		}
		await axios.get(url, {
			params: params,
			headers: headers,
		})
			.then(function (response) {
				//handle success
				localStorage.setItem('userFullAddr', response.data.documents[0].address_name);
				setFullAddr(response.data.documents[0].address_name);
			})
			.catch(function (error) {
				//handle error
				console.error(error.message);
			})
	}

	const getGeolocation = async () => {
		const { geolocation } = navigator;
		//사용자 브라우저에서 Geolocation이 정의되지 않은 경우 오류로 처리합니다.
		if (!geolocation) {
			alert("Geolocation is not supported.");
		}

		//Geolocation API 호출
		geolocation.getCurrentPosition(onSuccess, onError, {
			enableHighAccuracy: false,
			maximumAge: 1000 * 3600 * 24, //24h
			timeout: 5000, //5sec
		});
	}

	/* 지역 검색창 이벤트 핸들러 */
	useEffect(() => {
		// 이벤트 핸들러 함수
		const handler = (e) => {
			// mousedown 이벤트가 발생한 영역이 검색창이 아닐 때, default UI로 변경
			if (header.current && !header.current.contains(e.target)) {
				setSearchBtn(true);
			}
		}
		// 이벤트 핸들러 등록
		document.addEventListener('mousedown', handler);
		return () => {
			// 이벤트 핸들러 해제
			document.removeEventListener('mousedown', handler);
		}
	});

	return (
		<>
			{searchBtn
				?
				<div className='w-full h-[4rem]'>
					<div className='fixed z-30 flex flex-col h-[4rem] w-full justify-center items-center bg-white outline outline-1 outline-[#cccccc]'>
						<div className='flex flex-row w-[63rem] h-[3rem]items-center justify-between'>
							<Link to='/'>
								<div className='flex flex-row items-center'>
									<img className="inline w-10" alt="appIcon" src={AppIcon}></img>
									<span className='px-2 text-2xl text-[#272727]' style={{ fontFamily: "LeeSeoyun" }}>먼지구름</span>
								</div>
							</Link>
							<div className='ml-[11rem] flex items-center'>
								<button onClick={async () => {
									// window.location.reload();
									getGeolocation();
									//coord2addr(coord);

								}}>
									<LocationIcon className='inline w-6' />
								</button>
								<div className='ml-3 mr-2 text-xl font-semibold text-[#272727]'>{shortAddr}</div>

								<button onClick={() => {
									setSearchBtn(false)
								}} className="searchBtn">
									<DropDownArrowIcon id="drop-down-icon" className='inline w-6' />
								</button>
							</div>

							{
								location.pathname === '/'
									?
									<div className='flex flex-row items-center'>
										<Link to="/">
											<button
												className='h-[2rem] px-[0.7rem] flex items-center font-semibold text-[#272727]'>대기오염 현황</button>
										</Link>
										<Link to="/airmap">
											<button className='h-[2rem] px-[0.7rem] flex items-center font-base text-[#838383]'>지도로 보기</button>
										</Link>
										<Link to="/livecam">
											<button className='h-[2rem] px-[0.7rem] flex items-center font-base text-[#838383]'>실시간 영상</button>
										</Link>
									</div>
									: (location.pathname === '/airmap'
										? <div className='flex flex-row items-center'>
											<Link to="/">
												<button
													className='h-[2rem] px-[0.7rem] flex items-center font-base text-[#838383]'>대기오염 현황</button>
											</Link>
											<Link to="/airmap">
												<button className='h-[2rem] px-[0.7rem] flex items-center font-semibold text-[#272727]'>지도로 보기</button>
											</Link>
											<Link to="/livecam">
												<button className='h-[2rem] px-[0.7rem] flex items-center font-base text-[#838383]'>실시간 영상</button>
											</Link>
										</div>
										: <div className='flex flex-row items-center'>
											<Link to="/">
												<button
													className='h-[2rem] px-[0.7rem] flex items-center font-base text-[#838383]'
													onClick={(e) => { }}
												>대기오염 현황</button>
											</Link>
											<Link to="/airmap">
												<button className='h-[2rem] px-[0.7rem] flex items-center font-base text-[#838383]'>지도로 보기</button>
											</Link>
											<Link to="/livecam">
												<button className='h-[2rem] px-[0.7rem] flex items-center font-semibold text-[#272727]'>실시간 영상</button>
											</Link>
										</div>
									)
							}
						</div>
					</div>
				</div>
				:
				<div ref={header} className='w-full h-[4rem]'>
					<div className='fixed z-30 flex flex-col h-[4rem] w-full items-center justify-center bg-white outline outline-1 outline-[#cccccc]'>
						<div className='flex flex-row w-[63rem] h-[3rem]items-center justify-between'>
							<Link to='/'>
								<div className='flex flex-row items-center'>
									<img className="inline w-10" alt="appIcon" src={AppIcon}></img>
									<span className='px-2 text-2xl text-[#272727]' style={{ fontFamily: "LeeSeoyun" }}>먼지구름</span>
								</div>
							</Link>

							<div className='ml-[11rem] flex items-center'>
								<LocationIcon className='inline w-6' />
								<div className='ml-3 mr-2 text-xl font-semibold text-[#272727]'>{shortAddr}</div>
								<button onClick={() => {
									setSearchBtn(true)
								}} className="searchBtn">
									<DropDownArrowIcon id="drop-down-icon" className='inline w-6 rotate-180' />
								</button>
							</div>
							{
								location.pathname === '/'
									? <div className='flex flex-row items-center'>
										<Link to="/">
											<button
												className='h-[2rem] px-[0.7rem] flex items-center font-semibold text-[#272727]'
												onClick={(e) => { }}
											>대기오염 현황</button>
										</Link>
										<Link to="/airmap">
											<button className='h-[2rem] px-[0.7rem] flex items-center font-base text-[#838383]'>지도로 보기</button>
										</Link>
										<Link to="/livecam">
											<button className='h-[2rem] px-[0.7rem] flex items-center font-base text-[#838383]'>실시간 영상</button>
										</Link>
									</div>
									: (location.pathname === '/airmap'
										? <div className='flex flex-row items-center'>
											<Link to="/">
												<button
													className='h-[2rem] px-[0.7rem] flex items-center font-base text-[#838383]'
													onClick={(e) => { }}
												>대기오염 현황</button>
											</Link>
											<Link to="/airmap">
												<button className='h-[2rem] px-[0.7rem] flex items-center font-semibold text-[#272727]'>지도로 보기</button>
											</Link>
											<Link to="/livecam">
												<button className='h-[2rem] px-[0.7rem] flex items-center font-base text-[#838383]'>실시간 영상</button>
											</Link>
										</div>
										: <div className='flex flex-row items-center'>
											<Link to="/">
												<button
													className='h-[2rem] px-[0.7rem] flex items-center font-base text-[#838383]'
													onClick={(e) => { }}
												>대기오염 현황</button>
											</Link>
											<Link to="/airmap">
												<button className='h-[2rem] px-[0.7rem] flex items-center font-base text-[#838383]'>지도로 보기</button>
											</Link>
											<Link to="/livecam">
												<button className='h-[2rem] px-[0.7rem] flex items-center font-semibold text-[#272727]'>실시간 영상</button>
											</Link>
										</div>
									)
							}
						</div>
					</div>
					<SearchBox setShortAddr={setShortAddr} setFullAddr={setFullAddr} setCoord={setCoord} setSearchBtn={setSearchBtn} />
				</div>
			}
		</>
	)
}