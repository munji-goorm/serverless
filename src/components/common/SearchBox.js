import React, { useCallback, useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import axios from 'axios';

export const SearchBox = ({ setAddr, setCoord, setSearchBtn }) => {
	/* 특정 시간 동안 연속적으로 호출되는 이벤트 중 마지막 이벤트만 호출  */
	//callback: 일정 시간이 지난 후 실행되는 함수, delay: 지연 시간
	const debounce = (callback, delay) => {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => callback(...args), delay);
		}
	}

	/**검색어 자동완성 */
	const [inputValue, setInputValue] = useState('');
	const [isHaveInputValue, setIsHaveInputValue] = useState(false);
	const [dropDownList, setDropDownList] = useState([]);
	const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);

	const showDropDownList = useCallback(
		debounce(async (value) => {
			const endpoint = '/main/search';
			try {
				if (value === '') {
					setIsHaveInputValue(false);
					setDropDownList([]);
				} else {
					const res = await axios.get(endpoint, {
						params: {
							keyword: value
						}
					});
					const data = res.data.data;
					setDropDownList(data);
				}
			} catch (e) {
				console.error(e.message);
			}
		}, 500)
		, []);

	const changeInputValue = event => {
		showDropDownList(event.target.value);
		setInputValue(event.target.value);
		setIsHaveInputValue(true);
	}

	const clickDropDownItem = clickedItem => {
		setInputValue(clickedItem.shortAddr);
		setIsHaveInputValue(false);
		setAddr(clickedItem.shortAddr);
		setCoord({
			lat: clickedItem.xCoord,
			lng: clickedItem.yCoord
		});
		setSearchBtn(true);
		document.getElementById('drop-down-icon').classList.remove('rotate-180');
	}

	const handleDropDownKey = event => {
		//input에 값이 있을 때만 작동
		if (isHaveInputValue) {
			if (
				event.key === 'ArrowDown' &&
				dropDownList.length - 1 > dropDownItemIndex
			) {
				setDropDownItemIndex(dropDownItemIndex + 1);
			}
			if (event.key === 'ArrowUp' && dropDownItemIndex >= 0)
				setDropDownItemIndex(dropDownItemIndex - 1);
			if (event.key === 'Enter' && dropDownItemIndex >= 0) {
				clickDropDownItem(dropDownList[dropDownItemIndex]);
				setDropDownItemIndex(-1);
			}
		}
	}

	return (
		<div id="search-box" className='flex items-center flex-col fixed top-[4rem] z-20 w-full h-[25rem] bg-[#ffffff]'>
			<div className='w-[63rem] h-[25rem] flex flex-col items-center'>
				<div className='flex items-center mt-[1.5rem] w-[58rem] h-[3rem] bg-[#f4f4f4] rounded-3xl'>
					<SearchIcon className='ml-4' />
					<input type="text" placeholder="지역으로 검색하세요."
						className='bg-[#f4f4f4] w-[53rem] outline-none ml-2'
						value={inputValue}
						onChange={changeInputValue}
						onKeyUp={handleDropDownKey}
					/>
				</div>
				<div>
					{isHaveInputValue && (
						<div className='mt-[1rem] w-[58rem] h-[19.5rem] overflow-auto'>
							{dropDownList.map((dropDownItem, dropDownIndex) => {
								return (
									<div
										key={dropDownIndex}
										onClick={() => clickDropDownItem(dropDownItem)}
										onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
										className={dropDownItemIndex === dropDownIndex ? 'bg-[#f4f4f4] p-1 text-lg' : 'p-1 text-lg'}
									>
										{dropDownItem.fullAddr}
									</div>
								)
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
