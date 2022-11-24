import React from 'react';
import { DonutChart } from './DonutChart';

export const PollutantBox = ({stationInfo}) => {
	let CAIValue = Math.max(stationInfo.khaiValue, 0);
	let CAIState = stationInfo.khaiState;
	let so2Value = Math.max(stationInfo.so2Value, 0);
	let so2State = stationInfo.so2State;
	let no2Value = Math.max(stationInfo.no2Value, 0);
	let no2State = stationInfo.no2State;
	let coValue = Math.max(stationInfo.coValue, 0);
	let coState = stationInfo.coState;
	let o3Value = Math.max(stationInfo.o3Value, 0);
	let o3State = stationInfo.o3State;
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

	return (
		<div className='w-[63rem] h-[20rem] bg-[#ffffff] rounded-md my-[1.5rem]'>
			<div className='p-5 pb-10 text-lg font-bold text-[#272727]'>오염 물질</div>
			<div className='flex justify-center'>
				<DonutChart pollutant="CAI" grade={CAIState} value={CAIValue} name="통합대기지수" color={setColor(CAIState)} />
				<DonutChart pollutant="SO2" grade={so2State} value={so2Value} name="아황산가스" color={setColor(so2State)} />
				<DonutChart pollutant="NO2" grade={no2State} value={no2Value} name="이산화질소" color={setColor(no2State)} />
				<DonutChart pollutant="CO" grade={coState} value={coValue} name="일산화탄소" color={setColor(coState)} />
				<DonutChart pollutant="O3" grade={o3State} value={o3Value} name="오존" color={setColor(o3State)} />
			</div>
		</div>


	)
}
