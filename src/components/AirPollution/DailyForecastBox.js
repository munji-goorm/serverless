import React from 'react';
import Good from '../../assets/images/goodMunji.png';
import Usual from '../../assets/images/usualMunji.png';
import Bad from '../../assets/images/badMunji.png';
import VeryBad from '../../assets/images/veryBadMunji.png';
import Undefined from '../../assets/images/undefinedMunji.png';

export const DailyForecastBox = ({forecast}) => {
	let date = Object.keys(forecast);
	let color;
	let icon;
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
	const setIcon = (state) => {
		if (state === "좋음") {
			icon = Good;
		} else if (state === "보통") {
			icon = Usual;
		} else if (state === "나쁨") {
			icon = Bad;
		} else if (state === "최악") {
			icon = VeryBad;
		} else { //모름
			icon = Undefined;
		}
		return icon
	}

	return (
		<div className='flex flex-col items-center w-[30.5rem] h-[30.5rem] bg-[#ffffff] rounded-md mb-[0.5rem]'>
			<div className='mb-1 text-lg w-[31rem] font-bold text-[#272727]'>
				<div className='px-5 pt-5'>
					주간 예보
				</div>
			</div>
			<div className='flex flex-col items-center'>
				<div className='px-[6rem] w-[31rem] h-fit flex justify-between items-center'>
					<div className='w-[5rem] text-base font-semibold text-center'>
						오늘
					</div>
					<div className='flex px-3 w-[4rem] h-[2.5rem] rounded-lg items-center justify-center text-[#ffffff] text-2xl'
							 style={{backgroundColor: setColor(forecast[date[0]]),fontFamily:"LeeSeoyun"}}>
						{forecast[date[0]]}
					</div>
					<img className="inline w-14" alt="munjiIcon" src={setIcon(forecast[date[0]])}></img>
				</div>
				<div className='w-[19rem] h-[0.1rem] bg-[#f6f6f6]'></div>
				<div className=' px-[6rem] py-1 w-[31rem] h-fit flex justify-between items-center'>
					<div className='w-[5rem] text-base text-[#707070] font-semibold text-center'>
						{date[1]}
					</div>
					<div className='flex px-3 w-[4rem] h-[2.5rem] rounded-lg items-center justify-center text-[#ffffff] text-2xl'
							style={{backgroundColor: setColor(forecast[date[1]]),fontFamily:"LeeSeoyun"}}>
						{forecast[date[1]]}
					</div>
					<img className="inline w-14" alt="munjiIcon" src={setIcon(forecast[date[1]])}></img>
				</div>
				<div className='w-[19rem] h-[0.1rem] bg-[#f6f6f6]'></div>
				<div className='px-[6rem] py-1 w-[31rem] h-fit flex justify-between items-center'>
					<div className='w-[5rem] text-base text-[#707070] font-semibold text-center'>
					{date[2]}
					</div>
					<div className='flex px-3 w-[4rem] h-[2.5rem] rounded-lg items-center justify-center text-[#ffffff] text-2xl'
					style={{backgroundColor: setColor(forecast[date[2]]),fontFamily:"LeeSeoyun"}}>
					{forecast[date[2]]}
					</div>
					<img className="inline w-14" alt="munjiIcon" src={setIcon(forecast[date[2]])}></img>
				</div>
				<div className='w-[19rem] h-[0.1rem] bg-[#f6f6f6]'></div>
				<div className='px-[6rem] py-1 w-[31rem] h-fit flex justify-between items-center'>
					<div className='w-[5rem] text-base text-[#707070] font-semibold text-center'>
					{date[3]}
					</div>
					<div className='flex px-3 w-[4rem] h-[2.5rem] rounded-lg items-center justify-center text-[#ffffff] text-2xl'
					style={{backgroundColor: setColor(forecast[date[3]]),fontFamily:"LeeSeoyun"}}>
					{forecast[date[3]]}
					</div>
					<img className="inline w-14" alt="munjiIcon" src={setIcon(forecast[date[3]])}></img>
				</div>
				<div className='w-[19rem] h-[0.1rem] bg-[#f6f6f6]'></div>
				<div className='px-[6rem] py-1 w-[31rem] h-fit flex justify-between items-center'>
					<div className='w-[5rem] text-base text-[#707070] font-semibold text-center'>
					{date[4]}
					</div>
					<div className='flex px-3 w-[4rem] h-[2.5rem] rounded-lg items-center justify-center text-[#ffffff] text-2xl'
							style={{backgroundColor: setColor(forecast[date[4]]),fontFamily:"LeeSeoyun"}}>
					{forecast[date[4]]}
					</div>
					<img className="inline w-14" alt="munjiIcon" src={setIcon(forecast[date[4]])}></img>
				</div>
				<div className='w-[19rem] h-[0.1rem] bg-[#f6f6f6]'></div>
				<div className='px-[6rem] py-1 w-[31rem] h-fit flex justify-between items-center'>
					<div className='w-[5rem] text-base text-[#707070] font-semibold text-center'>
					{date[5]}
					</div>
					<div className='flex px-3 w-[4rem] h-[2.5rem] rounded-lg items-center justify-center text-[#ffffff] text-2xl'
							style={{backgroundColor: setColor(forecast[date[5]]),fontFamily:"LeeSeoyun"}}>
					{forecast[date[5]]}
					</div>
					<img className="inline w-14" alt="munjiIcon" src={setIcon(forecast[date[5]])}></img>
				</div>
			</div>
		</div>
	)
}
