import React from 'react';

export const RegionAirBtn = ({ region, value, color }) => {
	return (
		<div className='flex flex-col items-center w-12 h-12'>
			<div className='font-medium'>{region}</div>
			<div
				style={{ backgroundColor: color }}
				className='flex items-center justify-center w-12 h-6 rounded-xl'>
				<div className='text-[#ffffff] text-lg'>
					{value}
				</div>
			</div>
		</div>
	)
}
