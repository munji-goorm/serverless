import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart';

export const DonutChart = ({ pollutant, grade, value, name, color }) => {
	const [reveal, setReveal] = useState(10);
	useEffect(() => {
		let tmp;
		if (pollutant === "pm10K") {
			tmp = Math.min(value/151 * 100, 100);
			setReveal(tmp);
		} else if(pollutant === "pm25K"){
			tmp = Math.min(value/76 * 100, 100);
			setReveal(tmp);
		} else if (pollutant === "pm10W") {
			tmp = Math.min(value/101 * 100, 100);
			setReveal(tmp);
		} else if (pollutant === "pm25W") {
			tmp = Math.min(value/51 * 100, 100);
			setReveal(tmp);
		} else if (pollutant === "CAI") {
			tmp = Math.min(value/251 * 100, 100);
			setReveal(tmp);
		} else if (pollutant === "SO2") {
			tmp = Math.min(value/0.151 * 100, 100);
			setReveal(tmp);
		} else if (pollutant === "NO2") {
			tmp = Math.min(value/0.201 * 100, 100);
			setReveal(tmp);
		} else if (pollutant === "CO") {
			tmp = Math.min(value/15.01 * 100, 100);
			setReveal(tmp);
		} else if (pollutant === "O3") {
			tmp = Math.min(value/0.151 * 100, 100);
			setReveal(tmp);
		}     
	}, [value, pollutant]);

	return (
		<div className='relative flex flex-col mx-10 w-44'>
			<PieChart
				data={[
					{
						grade: grade,
						value: 20,
						color: color
					}
				]}
				reveal={reveal} //퍼센트 치수
				lineWidth={30} //도넛 두께
				background="#f5f6f9"
				startAngle={270}
				lengthAngle={360}
				rounded
				animate
				label={({ dataEntry }) => dataEntry.grade}
				labelStyle={{
					fontSize: "18px",
				}}
				labelPosition={0}
			/>
			<div className='relative text-sm text-[#838383] text-center top-[0.7rem]'>{value}</div>
			<div className='mt-4 font-semibold text-[#272727] text-center'>{name}</div>
		</div>
	)
}
