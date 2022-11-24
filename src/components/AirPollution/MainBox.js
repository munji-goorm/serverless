import React from 'react';
import Good from '../../assets/images/goodMunji.png';
import Usual from '../../assets/images/usualMunji.png';
import Bad from '../../assets/images/badMunji.png';
import VeryBad from '../../assets/images/veryBadMunji.png';
import Undefined from '../../assets/images/undefinedMunji.png';
import { ReactComponent as SpeechBubble } from '../../assets/icons/speechBubble.svg';
import { ReactComponent as Mask } from '../../assets/icons/mask.svg';
import { ReactComponent as Outdoor } from '../../assets/icons/outdoorActivity.svg';
import { ReactComponent as SensitiveGroup } from '../../assets/icons/sensitiveGroup.svg';
import { ReactComponent as Airout } from '../../assets/icons/airout.svg';
import { InstructionBox } from './InstructionBox';

export const MainBox = ({grade, dateTime}) => {
	let color;
	let msg;
	let icon;
	let instructions;

	/* 행동요령 */
	const GoodInstruction = {
		mask: "필요없음",
		sensitiveGroup: "필요없음",
		outdoor: "지장없음",
		airOut: "지장없음",
	}
	const UsualInstruction = {
		mask: "필요없음",
		sensitiveGroup: "착용권고",
		outdoor: "지장없음",
		airOut: "지장없음",
	}
	const BadInstruction = {
		mask: "필수",
		sensitiveGroup: "착용권고",
		outdoor: "가볍게만",
		airOut: "최소한만",
	}
	const veryBadInstruction = {
		mask: "필수",
		sensitiveGroup: "착용권고",
		outdoor: "자제",
		airOut: "최소한만",
	}
	const fixInstruction = {
		mask: "-",
		sensitiveGroup: "-",
		outdoor: "-",
		airOut: "-",
	}
	
	if (grade === "좋음") {
		color = "#549FF8";
		msg = "오늘은 공기가 좋아요 ><";
		icon = <img className="inline w-28" alt="icon" src={Good}></img>
		instructions = GoodInstruction;
	} else if (grade === "보통") {
		color = "#5AC451";
		msg = "무난한 날입니다~~~!"
		icon = <img className="inline w-28" alt="icon" src={Usual}></img>
		instructions = UsualInstruction;
	} else if (grade === "나쁨") {
		color = "#F1AA3E"
		msg = "대기질이 좋지않아요.."
		icon = <img className="inline w-28" alt="icon" src={Bad}></img>
		instructions = BadInstruction;
	} else if (grade === "최악") {
		color = "#D5534D";
		msg = "오늘은 외출을 삼가세요!";
		icon = <img className="inline w-28" alt="icon" src={VeryBad}></img>
		instructions = veryBadInstruction;
	} else { //점검중
		color = "#838383";
		msg = "기기를 점검중입니다..🛠"
		icon = <img className="inline w-28" alt="icon" src={Undefined}></img>
		instructions = fixInstruction;
	}

	return (
		<div className='flex items-center w-[63rem] h-[23rem] my-[2rem]'>
			<div className='relative rounded-md w-full h-[23rem]' style={{ backgroundColor: `${color}`}}>
				<div className='w-[63rem] absolute top-4 px-[4rem] text-right text-sm text-[#ffffff]'>{dateTime} 업데이트</div>
				<div className='relative'>
					<div className='flex items-center justify-center py-8'>
						{icon}
						<div className='px-6 py-6 text-[60px] text-center text-[#ffffff]'
						style={{fontFamily:"LeeSeoyun"}}>{grade}</div>
					</div>
					<div className='justify-center speechBubble'>
						<div className='relative flex justify-center bottom-10'>
							<SpeechBubble />
							<div className='absolute text-2xl top-5 text-[#ffffff]'
							style={{fontFamily:"LeeSeoyun"}}>
								{msg}
							</div>
						</div>
					</div>
				</div>
				<div className='flex justify-center my-2 instructions'>
					<InstructionBox icon={<Mask />} title="마스크" msg={instructions.mask} />
					<InstructionBox icon={<SensitiveGroup />} title="민감군" msg={instructions.sensitiveGroup} />
					<InstructionBox icon={<Outdoor />} title="야외활동" msg={instructions.outdoor} />
					<InstructionBox icon={<Airout />} title="환기" msg={instructions.airOut} />
				</div>
			</div>
		</div>
	)
}
