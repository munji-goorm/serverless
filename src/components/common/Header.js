import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppIcon from '../../assets/images/goodMunji.png';
import { ReactComponent as LocationIcon } from '../../assets/icons/location.svg';
import { ReactComponent as DropDownArrowIcon } from '../../assets/icons/dropDownArrow.svg';
import { SearchBox } from './SearchBox';

export default function Header({ addr, setAddr, setCoord }) {
	const [searchBtn, setSearchBtn] = useState(true);
	const header = useRef();
	const location = useLocation();

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
								<button onClick={() => {
									window.location.reload();
								}}>
									<LocationIcon className='inline w-6' />
								</button>
								<div className='ml-3 mr-2 text-xl font-semibold text-[#272727]'>{addr}</div>

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
								<div className='ml-3 mr-2 text-xl font-semibold text-[#272727]'>{addr}</div>
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
					<SearchBox setAddr={setAddr} setCoord={setCoord} setSearchBtn={setSearchBtn} />
				</div>
			}
		</>
	)
}