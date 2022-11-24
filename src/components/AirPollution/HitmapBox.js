import React, { useEffect } from 'react';

export const HitmapBox = ({ name, val }) => {
	useEffect(() => {
		let iframeSrc = `https://earth.nullschool.net/ko/#current/particulates/surface/level/overlay=${val}/orthographic=127.868,37.20,1300`;
		document.getElementById(val).src = iframeSrc;
	}, []);

	return (
		<div className='w-[31rem] flex flex-col justify-center h-[17rem] bg-[#ffffff] rounded-md my-[0.5rem]'>
			<div className='p-5 text-base font-bold text-[#272727]'>{name}</div>
			<div className='w-[31rem] flex justify-center px-5'>
				<iframe id={val} title={name} className='rounded-lg w-[29rem] h-[12rem] mb-5'></iframe>
			</div>
		</div>
	)
}
