import React from 'react';
import AppIcon from '../../assets/images/goodMunji.png';
import { ReactComponent as GithubIcon } from '../../assets/icons/github.svg';
import { ReactComponent as NotionIcon } from '../../assets/icons/notion.svg';

export default function Footer() {
	return (
		<div className='flex flex-col h-[20rem] mt-[5rem] bg-[#ffffff] outline outline-1 outline-[#cccccc] items-center justify-center text-[#272727]'>
			<div className='flex flex-col w-[63rem] h-[9rem] justify-center'>
				<div className='flex flex-row items-center h-[4rem]'>
					<img className="w-10" alt="appIcon" src={AppIcon}></img>
					<div className='text-2xl ml-[0.5rem]' style={{ fontFamily: "LeeSeoyun" }}>만든 사람</div>
				</div>
				<div className='text-lg py-[0.3rem]' style={{ fontFamily: "LeeSeoyun" }}>
					예쁘고 귀엽게 봐주세요. 감사합니다 :) <br />
					<span className='text-sm text-[#878787]'> 이름을 클릭하면 깃허브 링크로 이동합니다.</span>
				</div>
			</div>

			<div className='w-[63rem] h-[9rem] flex flex-row justify-between'>
				<div className='flex flex-row w-[27rem] justify-between'>
					<div className=''>
						<a href='https://github.com/oduodg' target="_blank" rel="noreferrer">
							<div className='mb-[0.2rem] text-lg hover:text-[#8A67AB] hover:font-bold hover:rotate-3' style={{ fontFamily: "LeeSeoyun" }}>
								Eun <br /> Lee
							</div>
						</a>
						<div className='flex items-center'>
							<div className='text-xs'>
								Team Leader <br />
							</div>
						</div>
					</div>
					<div className=''>
						<a href='https://github.com/ksee1230' target="_blank" rel="noreferrer">
							<div className='mb-[0.2rem] text-lg hover:text-[#548164] hover:font-bold hover:rotate-3' style={{ fontFamily: "LeeSeoyun" }}>
								Kyungsoo <br /> Park
							</div>
						</a>
					</div>
					<div className=''>
						<a href='https://github.com/Zemni98' target="_blank" rel="noreferrer">
							<div className='mb-[0.2rem] text-lg hover:text-[#5081A9] hover:font-bold hover:rotate-3' style={{ fontFamily: "LeeSeoyun" }}>
								Jaemin <br /> Shin
							</div>
						</a>
					</div>
					<div className=''>
						<a href='https://github.com/soyeonnn' target="_blank" rel="noreferrer">
							<div className='mb-[0.2rem] text-lg hover:text-[#C29343] hover:font-bold hover:rotate-3' style={{ fontFamily: "LeeSeoyun" }}>
								Soyeon <br /> Hwang
							</div>
						</a>
					</div>
				</div>

				<div className='flex text-xl' style={{ fontFamily: "LeeSeoyun" }}>
					Kakao Cloud School <br />
					Dev 1th. <br />
					Final Project
				</div>
			</div>
			<div className='w-[63rem] h-[7rem] flex flex-col'>
				<div className='flex flex-col items-center justify-center'>
					<div className='flex flex-row'>
						<div className='mx-[0.5rem] flex'>
							<a href='https://github.com/munji-goorm' target="_blank" rel="noreferrer">
								<GithubIcon className='mx-[0.3rem]' />
							</a>
							<a href='https://oduodg.notion.site/39490b032260464fb7a5160a5867b4cf' target="_blank" rel="noreferrer">
								<NotionIcon className='mx-[0.3rem]' />
							</a>
						</div>
					</div>
					<div className='text-sm text-center text-[#838383] pt-[1rem]'>
						ⓒ 2022 MunjiGoorm - All rights reserved.
					</div>
				</div>
			</div>
		</div>
	)
}