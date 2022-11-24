import React from 'react';
import Map from '../../assets/images/KoreaMap.png';
import { RegionAirBtn } from './RegionAirBtn';

export const WholeAirInfoBox = ({gradeList, valueList}) => {
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
		<div className='relative w-[30.5rem] h-[30.5rem] bg-[#ffffff] rounded-md mb-[0.5rem]'>
			<div className='pt-5 px-5 text-lg font-bold text-[#272727]'>전국 대기 정보</div>
			<div className='flex justify-center'>
				<img alt="map" className='w-[17rem]' src={Map} />
			</div>
			<div className='absolute w-12 h-12 left-[10rem] bottom-[21.9rem]'>
				<RegionAirBtn region="서울" value={valueList["서울"]} color={setColor(gradeList["서울"])} />
			</div>
			<div className='absolute w-12 h-12 left-[7rem] bottom-[20rem]'>
				<RegionAirBtn region="인천" value={valueList["인천"]} color={setColor(gradeList["인천"])} />
			</div>
			<div className='absolute w-12 h-12 left-[11rem] bottom-[19rem]'>
				<RegionAirBtn region="경기" value={valueList["경기"]} color={setColor(gradeList["경기"])} />
			</div>
			<div className='absolute w-12 h-12 left-[15.5rem] bottom-[22rem]'>
				<RegionAirBtn region="강원" value={valueList["강원"]} color={setColor(gradeList["강원"])} />
			</div>
			<div className='absolute w-12 h-12 left-[11rem] bottom-[16rem]'>
				<RegionAirBtn region="세종" value={valueList["세종"]} color={setColor(gradeList["세종"])} />
			</div>
			<div className='absolute w-12 h-12 left-[8rem] bottom-[15.3rem]'>
				<RegionAirBtn region="충남" value={valueList["충남"]} color={setColor(gradeList["충남"])} />
			</div>
			<div className='absolute w-12 h-12 left-[14rem] bottom-[17rem]'>
				<RegionAirBtn region="충북" value={valueList["충북"]} color={setColor(gradeList["충북"])} />
			</div>
			<div className='absolute w-12 h-12 left-[18rem] bottom-[15rem]'>
				<RegionAirBtn region="경북" value={valueList["경북"]} color={setColor(gradeList["경북"])} />
			</div>
			<div className='absolute w-12 h-12 left-[20rem] bottom-[11rem]'>
				<RegionAirBtn region="울산" value={valueList["울산"]} color={setColor(gradeList["울산"])} />
			</div>
			<div className='absolute w-12 h-12 left-[13rem] bottom-[12.5rem]'>
				<RegionAirBtn region="대전" value={valueList["대전"]} color={setColor(gradeList["대전"])} />
			</div>
			<div className='absolute w-12 h-12 left-[16.5rem] bottom-[12rem]'>
				<RegionAirBtn region="대구" value={valueList["대구"]} color={setColor(gradeList["대구"])} />
			</div>
			<div className='absolute w-12 h-12 left-[10rem] bottom-[11rem]'>
				<RegionAirBtn region="전북" value={valueList["전북"]} color={setColor(gradeList["전북"])} />
			</div>
			<div className='absolute w-12 h-12 left-[7rem] bottom-[8rem]'>
				<RegionAirBtn region="광주" value={valueList["광주"]} color={setColor(gradeList["광주"])} />
			</div>
			<div className='absolute w-12 h-12 left-[11rem] bottom-[6rem]'>
				<RegionAirBtn region="전남" value={valueList["전남"]} color={setColor(gradeList["전남"])} />
			</div>
			<div className='absolute w-12 h-12 left-[15rem] bottom-[8.5rem]'>
				<RegionAirBtn region="경남" value={valueList["경남"]} color={setColor(gradeList["경남"])} />
			</div>
			<div className='absolute w-12 h-12 left-[19rem] bottom-[7.5rem]'>
				<RegionAirBtn region="부산" value={valueList["부산"]} color={setColor(gradeList["부산"])} />
			</div>
			<div className='absolute w-12 h-12 left-[9rem] bottom-[2rem]'>
				<RegionAirBtn region="제주" value={valueList["제주"]} color={setColor(gradeList["제주"])} />
			</div>
		</div>
	)
}
