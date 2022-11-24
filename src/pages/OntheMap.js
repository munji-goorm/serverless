import React, { useRef, useState } from 'react'
import { InfoBox, StationMap } from '../components/OntheMap';

export default function Map() {
	const [currentBtn, setCurrentBtn] = useState("CAI");
	let pollutantBtn = useRef();

	const onClickBtn = (e) => {
		let pollutantName = e.target.innerHTML;
		if (e.target.innerHTML === "PM2.5") {
			pollutantName = "PM25"
		}
		setCurrentBtn(pollutantName);
		let parents = pollutantBtn.current;
		for (const child of parents.children) {
			child.classList.remove("text-[#ffffff]");
			child.classList.remove("bg-[#272727]");
			child.classList.add("text-[#838383]");
		}
		e.target.classList.remove("text-[#838383]");
		e.target.classList.add("text-[#ffffff]");
		e.target.classList.add("bg-[#272727]");
	}

	return (
		<div className='flex flex-col items-center'>
			<div className='relative my-[2rem] flex justify-center'>
				<StationMap name={currentBtn}/>
				<div ref={pollutantBtn} className='z-10 right-[1rem] top-[1rem] rounded-lg absolute flex flex-col w-[5rem] h-fit bg-[#ffffff] drop-shadow-lg text-[#272727]'>
					<button className='hover:text-[#ffffff] hover:bg-[#272727] text-[#ffffff] bg-[#272727] z-20 py-0.5 w-[5rem] rounded-md h-1/7'
						onClick={onClickBtn}>
						CAI
					</button>
					<button className='hover:text-[#ffffff] hover:bg-[#272727] text-[#838383] z-20 py-0.5 w-[5rem] rounded-md h-1/7'
						onClick={onClickBtn}>
						PM10
					</button>
					<button className='hover:text-[#ffffff] hover:bg-[#272727] text-[#838383] z-20 py-0.5 w-[5rem] rounded-md h-1/7'
						onClick={onClickBtn}>
						PM2.5
					</button>
					<button className='hover:text-[#ffffff] hover:bg-[#272727] text-[#838383] z-20 py-0.5 w-[5rem] rounded-md h-1/7'
						onClick={onClickBtn}>
						SO2
					</button>
					<button className='hover:text-[#ffffff] hover:bg-[#272727] text-[#838383] z-20 py-0.5 w-[5rem] rounded-md h-1/7'
						onClick={onClickBtn}>
						NO2
					</button>
					<button className='hover:text-[#ffffff] hover:bg-[#272727] z-20 text-[#838383] py-0.5 w-[5rem] rounded-md h-1/7'
						onClick={onClickBtn}>
						CO
					</button>
					<button className='hover:text-[#ffffff] hover:bg-[#272727] text-[#838383] z-20 py-0.5 w-[5rem] rounded-md h-1/7'
						onClick={onClickBtn}>
						O3
					</button>
				</div>
			</div>
			<InfoBox name={currentBtn} />
		</div>
	)
}