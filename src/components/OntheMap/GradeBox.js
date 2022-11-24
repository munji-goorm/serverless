import React, { useEffect, useState } from 'react';

export const GradeBox = ({ name }) => {

	const [gradeVal, setGradeVal] = useState({
		goodVal: "~50",
		usualVal: "~100",
		badVal: "~250",
		veryBadVal: "251~"
	});

	useEffect(() => {
		if (name === "CAI") { //통합대기지수
			setGradeVal({
				goodVal: "~50",
				usualVal: "~100",
				badVal: "~250",
				veryBadVal: "251~"
			})
		} else if (name === "PM10") { //미세먼지
			setGradeVal({
				goodVal: "~30",
				usualVal: "~50",
				badVal: "~100",
				veryBadVal: "101~"
			})
		} else if (name === "PM25") { //초미세먼지
			setGradeVal({
				goodVal: "~15",
				usualVal: "~25",
				badVal: "~50",
				veryBadVal: "51~"
			})
		} else if (name === "SO2") { //아황산가스
			setGradeVal({
				goodVal: "~0.020",
				usualVal: "~0.050",
				badVal: "~0.150",
				veryBadVal: "0.151~"
			})
		} else if (name === "NO2") { //이산화질소
			setGradeVal({
				goodVal: "~0.030",
				usualVal: "~0.060",
				badVal: "~0.200",
				veryBadVal: "0.201~"
			})
		} else if (name === "CO") { //일산화탄소
			setGradeVal({
				goodVal: "~2.00",
				usualVal: "~9.00",
				badVal: "~15.00",
				veryBadVal: "15.01~"
			})
		} else if (name === "O3") { //오존
			setGradeVal({
				goodVal: "~0.030",
				usualVal: "~0.090",
				badVal: "~0.150",
				veryBadVal: "0.151~"
			})
		} 
	}, [name]);


	return (
		<div className='flex flex-col w-full h-[4.5rem]'>
			<div className='flex flex-row items-center justify-between h-1/3 text-[#272727] font-medium'>
				<div className='flex flex-col items-center justify-center w-[14.8rem] h-[1rem]'>
					<div className=''>{gradeVal.goodVal}</div>
				</div>
				<div className='flex flex-col items-center justify-center w-[14.8rem] h-[1rem]'>
					<div className=''>{gradeVal.usualVal}</div>
				</div>
				<div className='flex flex-col items-center justify-center w-[14.8rem] h-[1rem]'>
					<div className=''>{gradeVal.badVal}</div>
				</div>
				<div className='flex flex-col items-center justify-center w-[14.8rem] h-[1rem]'>
					<div className=''>{gradeVal.veryBadVal}</div>
				</div>
			</div>
			<div className='flex flex-row items-center justify-between w-full h-1/3'>
				<div className='rounded-xl w-[14.8rem] h-[1rem] bg-[#549FF8]'></div>
				<div className='rounded-xl w-[14.8rem] h-[1rem] bg-[#5AC451]'></div>
				<div className='rounded-xl w-[14.8rem] h-[1rem] bg-[#F1AA3E]'></div>
				<div className='rounded-xl w-[14.8rem] h-[1rem] bg-[#D5534D]'></div>
			</div>
			<div className='flex flex-row items-center justify-between h-1/3 text-[#838383] font-medium'>
				<div className='flex flex-col justify-center w-[14.8rem] h-[1rem]'>
					<div className='text-center'>좋음</div>
				</div>
				<div className='flex flex-col justify-center w-[14.8rem] h-[1rem]'>
					<div className='text-center'>보통</div>
				</div>
				<div className='flex flex-col justify-center w-[14.8rem] h-[1rem]'>
					<div className='text-center'>나쁨</div>
				</div>
				<div className='flex flex-col justify-center w-[14.8rem] h-[1rem]'>
					<div className='text-center'>최악</div>
				</div>
			</div>
		</div>
	)
}
