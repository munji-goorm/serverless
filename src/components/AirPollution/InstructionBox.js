import React from 'react';

export const InstructionBox = ({icon, title, msg}) => {

	return (
		<div 
		style={{backgroundColor: "rgba(255, 255, 255, 0.35)"}} 
		className='flex items-center mx-7 w-36 rounded-lg h-16 bg-[#ffffff]'>
			<div className='mx-2'>{icon}</div>
			<div className='text-[#ffffff] content'>
			<div className='text-sm font-medium'>{title}</div>
			<div className='font-semibold'>{msg}</div>
			</div>
		</div>
	)
}
