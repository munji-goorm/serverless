import React from 'react';
import AppIcon from '../../assets/images/goodMunji.png';
import { ReactComponent as GithubIcon } from '../../assets/icons/github.svg'

export default function Footer() {
	return (
		<div className='flex flex-col h-[22rem] mt-[5rem] bg-[#ffffff] outline outline-1 outline-[#cccccc] items-center justify-center text-[#272727]'>
			<div className='flex flex-col w-[63rem] h-[9rem] justify-center'>
				<div className='flex flex-row items-center h-[4rem]'>
					<img className="w-10" alt="appIcon" src={AppIcon}></img>
					<div className='text-2xl ml-[0.5rem]' style={{fontFamily:"LeeSeoyun"}}>만든 사람</div>
				</div>
				<div className='pt-1 text-lg' style={{fontFamily:"LeeSeoyun"}}>
					예쁘고 귀엽게 봐주세요. 감사합니다 :)
				</div>
			</div>

			<div className='w-[63rem] h-[9rem] flex flex-row justify-between'>
				<div className='flex flex-row '>
					<div className='mr-[4rem]'>
						<div className='mb-[0.2rem] text-lg' style={{fontFamily:"LeeSeoyun"}}>
							Eun <br /> Lee
						</div>
						<div className='text-xs'>
							Team Leader <br />
						</div>
					</div>
					<div className='mr-[4rem]'>
						<div className='text-lg' style={{fontFamily:"LeeSeoyun"}}>
							Kyungsoo <br /> Park
						</div>
					</div>
					<div className='mr-[4rem]'>
						<div className='text-lg' style={{fontFamily:"LeeSeoyun"}}>
							Jaemin <br /> Shin
						</div>
					</div>
					<div className='mr-[4rem]'>
						<div className='text-lg' style={{fontFamily:"LeeSeoyun"}}>
							Soyeon <br /> Hwang
						</div>
					</div>
				</div>

				<div className='flex text-2xl' style={{fontFamily:"LeeSeoyun"}}>
					kakao cloud school <br />
					Dev 1th. <br />
					Final Project
				</div>
			</div>

			<div className='w-[63rem] h-[7rem] flex flex-col'>
				<div className='flex flex-col items-center justify-center'>
					<div className='flex flex-row'>
						<div className='mx-[0.5rem]'>
							<a href='https://github.com/munji-goorm' target="_blank" rel="noreferrer">
							<GithubIcon />
							</a>
						</div>
					</div>

					<div className='text-sm text-center text-[#838383] pt-[1rem]'>
						ⓒ 2022 kakao cloud school Dev 1th. Team2 - Allrights reserved.
					</div>

				</div>

			</div>


		</div>
	)
}
