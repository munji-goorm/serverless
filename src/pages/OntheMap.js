import React, { useRef, useState } from 'react'
import { InfoBox, StationMap } from '../components/OntheMap';

export default function Map({coord}) {
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
				<StationMap coord={coord} name={currentBtn}/>
				<div ref={pollutantBtn} className='z-10 right-[3rem] top-[0.2rem] rounded absolute flex flex-col w-[5rem] h-fit bg-[#ffffff] text-[#272727] text-base'
				style={{boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 2px 0px"}}>
					<button className='hover:text-[#ffffff] hover:bg-[#272727] text-[#ffffff] bg-[#272727] z-20 py-[0.0828rem] w-[5rem] rounded h-1/7'
						onClick={onClickBtn}>
						CAI
					</button>
					<button className='hover:text-[#ffffff] hover:bg-[#272727] text-[#838383] z-20 py-[0.0828rem] w-[5rem] rounded h-1/7'
						onClick={onClickBtn}>
						PM10
					</button>
					<button className='hover:text-[#ffffff] hover:bg-[#272727] text-[#838383] z-20 py-[0.0828rem] w-[5rem] rounded h-1/7'
						onClick={onClickBtn}>
						PM2.5
					</button>
					<button className='hover:text-[#ffffff] hover:bg-[#272727] text-[#838383] z-20 py-[0.0828rem] w-[5rem] rounded h-1/7'
						onClick={onClickBtn}>
						SO2
					</button>
					<button className='hover:text-[#ffffff] hover:bg-[#272727] text-[#838383] z-20 py-[0.0828rem] w-[5rem] rounded h-1/7'
						onClick={onClickBtn}>
						NO2
					</button>
					<button className='hover:text-[#ffffff] hover:bg-[#272727] z-20 text-[#838383] py-[0.0828rem] w-[5rem] rounded h-1/7'
						onClick={onClickBtn}>
						CO
					</button>
					<button className='hover:text-[#ffffff] hover:bg-[#272727] text-[#838383] z-20 py-[0.0828rem] w-[5rem] rounded h-1/7'
						onClick={onClickBtn}>
						O3
					</button>
				</div>
			</div>
			<InfoBox name={currentBtn} />
		</div>
	)
}