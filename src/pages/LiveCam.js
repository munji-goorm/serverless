import React, { useState } from 'react';
import { CCTVMap } from '../components/LiveCam';
import { ReactComponent as DropDownArrowIcon } from '../assets/icons/dropDownArrow.svg';
import seoulGood from '../assets/images/seoulGood.png';
import busanGood from '../assets/images/busanGood.png';
import jejuGood from '../assets/images/jejuGood.png';

export default function LiveCam({ coord }) {
	const [clickBtn, setClickBtn] = useState(true);

	return (
		<div className='flex flex-col items-center justify-center'>
			<div className='relative my-[2rem] flex-col items-center flex justify-center'>
				<CCTVMap coord={coord} />
				<div className='absolute z-10 w-[4rem] text-center text-[#ffffff] bg-[#272727] h-[2rem] py-1 right-[3rem] top-[0.2rem] text-base rounded'
					style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 2px 0px" }}>CCTV</div>
			</div>

			<div className='justify-center flex flex-col mb-[1rem] w-[63rem] h-fit text-xs text-[#838383]'>
				<span>
					* 도로교통법 145조에 의거하여 교통관제용으로 사용되는 CCTV 영상중, 도시교통정보센터 UTIC 사업으로 연결된 영상을 중심으로 제공해 드립니다.
				</span>
				<span>
					* 제공되는 스트리밍 CCTV영상은 해당 지방자치단체의 상황에 따라서 영상이 표출되지 않을수도 있으며, 시스템 점검등의 이유로 중단될 수도 있습니다.
				</span>
				<span>
					[주의] 개방데이터의 모든 CCTV영상은 해당 지역교통정보센터나 기관에서 제공하는 영상에 한해서 오픈해 드리고 있으며, 해당 영상은 수시로 중단될 수 있음을 알려드립니다.
				</span>
				<span>
					* 일부 CCTV의 경우 Internet Explorer에서만 정상작동 할 수 있습니다.
				</span>
			</div>

			<div className='mt-[1rem] w-[63rem] flex flex-row h-fit items-center'>
				<div className='text-lg font-bold text-[#272727]'>On Air</div>
				<div className='ml-[0.5rem] w-[0.5rem] mb-[0.4rem] bg-[#E03123] h-[0.5rem]' style={{ borderRadius: "50%" }}></div>
			</div>
			<div className='flex mt-[1rem] mb-[0.4rem] justify-between w-[63rem] h-fit items-center text-[#272727] font-medium text-base'>
				<div className='w-[19rem]'>서울 반포대교</div>
				<div className='w-[19rem]'>부산 광안대교</div>
				<div className='w-[19rem]'>제주 협재바다</div>
			</div>

			<div className='w-[63rem] h-[12rem] flex justify-between'>
				<iframe id="seoulVideo" frameBorder="0" allowFullScreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="실시간 서울 한강 라이브캠 Seoul Hangang 4K Live Cam Webcam w/Lofi 韓国ライブカメラ, 반포대교 노을멍, 코딩 노동요 로파이 플레이리스트 BGM" width="320" height="180" src="https://www.youtube.com/embed/-JhoMGoAfFc?autoplay=1&amp;rel=0&amp;modestbranding=1&amp;mute=1&amp;enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A3000&amp;widgetid=7" sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation"></iframe>

				<iframe id="busanVideo" frameBorder="0" allowFullScreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="🔴실시간 부산 라이브캠 🌕 Busan Live Cam Korea CCTV Live" width="320" height="180" src="https://www.youtube.com/embed/i3rkCPrVAgM?autoplay=1&amp;rel=0&amp;modestbranding=1&amp;mute=1&amp;enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A3000&amp;widgetid=1" sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation"></iframe>

				<iframe id="jejuVideo" frameBorder="0" allowFullScreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="펀제주 실시간 제주도 날씨 제주 협재 바다 라이브캠  Jeju Island in South Korea Live Cam" width="320" height="180" src="https://www.youtube.com/embed/oEXCjWsksA8?autoplay=1&amp;rel=0&amp;modestbranding=1&amp;mute=1&amp;enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A3000&amp;widgetid=5" sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation"></iframe>
			</div>

			{
				clickBtn ?
					<div className='w-[63rem] h-[1rem] my-[1rem] text-[#272727] flex flex-col font-medium text-sm'>
						<button onClick={() => {
							setClickBtn(false)
						}}>
							<div className='flex items-center'>
								미세먼지 적은 날과 비교하기
								<DropDownArrowIcon id="drop-down-icon" className='inline w-5' />
							</div>
						</button>
					</div>
					:
					<div className='w-[63rem] h-[10rem] my-[1rem] text-[#272727] flex flex-col font-medium text-sm'>
						<button onClick={() => {
							setClickBtn(true)
						}}>
							<div className='flex items-center'>
								미세먼지 적은 날과 비교하기
								<DropDownArrowIcon id="drop-down-icon" className='inline w-5 rotate-180' />
							</div>
						</button>
						<div className='w-[63rem] flex items-stretch justify-between'>
							<img className="float-left w-[20.1rem]" alt="seoulGood" src={seoulGood} />
							<img className="float-left w-[20.1rem]" alt="busanGood" src={busanGood} />
							<img className="float-left w-[20.1rem]" alt="jejuGood" src={jejuGood} />
						</div>
					</div>
			}
		</div>
	)
}