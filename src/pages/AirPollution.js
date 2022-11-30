import React from 'react';
import { DailyForecastBox, HitmapBox, MainBox, PollutantBox, WholeAirInfoBox } from '../components/AirPollution';
import { PM10Box } from '../components/AirPollution/PM10Box';

export default function AirPollution({stationData, addr}) {
	let stationInfo = stationData.stationInfo;
	let stationName = stationInfo.stationName;
	let grade = stationInfo.khaiState;
	let dateTime = stationInfo.dateTime;
	let forecast = stationData.forecast;
	let nationwideGrade = stationData.nationwide;
	let nationwideValue = stationData.nationwideValue;

	return (
		<div className='flex flex-col items-center w-full'>
			<MainBox grade={grade} dateTime={dateTime} stationName={stationName}/>
			<div className='w-[63rem] flex flex-row justify-between'>
				<DailyForecastBox forecast={forecast}/>
				<WholeAirInfoBox gradeList={nationwideGrade} valueList={nationwideValue}/>
			</div>
			<PM10Box stationInfo={stationInfo}/>
			<div className='w-[63rem] flex flex-row justify-between'>
				<HitmapBox name="미세먼지" val="pm10"/>
				<HitmapBox name="초미세먼지" val="pm2.5"/>
			</div>
			<PollutantBox stationInfo={stationInfo}/>
		</div>
	)
}
