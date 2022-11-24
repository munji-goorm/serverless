import React, { useState } from 'react';
import { DonutChart } from './DonutChart';
import { ReactComponent as InfoIcon } from '../../assets/icons/info.svg';

export const PM10Box = ({stationInfo}) => {
	console.warn = console.error = () => {};
	let pm10Value = Math.max(stationInfo.pm10Value, 0);
	let pm10StateK = stationInfo.pm10StateK;
	let pm10StateW = stationInfo.pm10StateW;
	let pm25Value = Math.max(stationInfo.pm25Value, 0);
	let pm25StateK = stationInfo.pm25StateK;
	let pm25StateW = stationInfo.pm25StateW;
	
	let color;
	const setColor = (state) => {
		if (state === "좋음") {
			color = "#549FF8";
		} else if (state === "보통") {
			color = "#5AC451";
		} else if (state === "나쁨") {
			color = "#F1AA3E";
		} else if (state === "최악") {
			color = "#D5534D";
		} else { //모름
			color = "#838383";
		}
		return color
	}
	const [isHoveringKor, setIsHoveringKor] = useState(false);
	const [isHoveringWHO, setIsHoveringWHO] = useState(false);

	return (
		<div className='w-[63rem] h-[23rem] text-[#272727] bg-[#ffffff] rounded-md my-[1.5rem]'>
			<div className='px-5 mt-5 mb-4 text-lg font-bold'>미세먼지</div>
			<div className='flex justify-between'>
				<div className='flex items-center mx-5 mb-5 w-[28rem]'>
					<div className='font-semibold'>
						국내 기준
					</div>
					<div className='mx-2'>
						<div className='relative w-[20rem]'>
							<InfoIcon className='hover:cursor-pointer'
							onMouseOver={() => setIsHoveringKor(true)}
							onMouseOut={() => setIsHoveringKor(false)}/>
							{isHoveringKor ?
								<div className='drop-shadow-md absolute -top-3 left-10 z-10 rounded-md w-fit h-fit bg-[#ffffff]'>
									<div className='p-2 text-xs leading-5'>
										한국에서는 WHO에 비해 낮은 기준치를 사용합니다.
									</div>
								</div>
								:
								<></>
							}
						</div>
					</div>
				</div>
				<div className='flex items-center mx-5 mb-5 w-[28rem]'>
					<div className='font-semibold'>
						WHO
					</div>
					<div className='mx-2'>
						<div className='relative w-[20rem]'>
							<InfoIcon className='hover:cursor-pointer'
							onMouseOver={() => setIsHoveringWHO(true)}
							onMouseOut={() => setIsHoveringWHO(false)}/>
							{isHoveringWHO ?
								<div className='drop-shadow-md absolute -top-5 left-10 z-10 rounded-md w-fit h-fit bg-[#ffffff]'>
									<div className='p-2 text-xs leading-5'>
										WHO 세계건강보건기구의 권고치 기준입니다. <br/>
										자세한 등급은 "지도로 보기"에서 확인하실 수 있습니다.
									</div>
								</div>
								:
								<></>
							}
						</div>
					</div>
				</div>
			</div>
			<div className='flex justify-center'>
				<DonutChart pollutant="pm10K" grade={pm10StateK} value={pm10Value} name="미세먼지" color={setColor(pm10StateK)} />
				<DonutChart pollutant="pm25K" grade={pm25StateK} value={pm25Value} name="초미세먼지" color={setColor(pm25StateK)} />
				<DonutChart pollutant="pm10W" grade={pm10StateW} value={pm10Value} name="미세먼지" color={setColor(pm10StateW)} />
				<DonutChart pollutant="pm25W" grade={pm25StateW} value={pm25Value} name="초미세먼지" color={setColor(pm25StateW)} />
			</div>
		</div>
	)
}
