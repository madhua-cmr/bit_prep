import Image from 'next/image'
import { Button } from './ui/button'
import dayjs from "dayjs"
import { getRandomInterviewCover } from '@/lib/utils'
import Link from 'next/link'
import DisplayTechIcons from './DisplayTechIcons'
const InterviewCard = ({id,userId,role,type, techstack ,level ,questions, finalized ,createdAt}:Interview) => {
  const feedback=null as Feedback|null;
  const normalizedType=/mix/gi.test(type)?'Mixed':type;
  const formatteddate=dayjs(feedback?.createdAt||createdAt||Date.now()).format('MMM D, YYYY')
console.log(techstack)
  return (
    <div className='flex-c relative card-bg'>
      <div className='absolute card-sm'>{normalizedType}</div>
      <div><Image src={getRandomInterviewCover()} alt="company logo" width={50} height={50}></Image></div>
      <h2>{role} Interview</h2>
      <div className='flex-between'>
           <div className='flex-row-cen'>
        <Image src="/calendar.svg" alt="calendar" width={20} height={20} className=''>

        </Image>
     <h3>{formatteddate} </h3>
        </div>
        <div className='flex-row-cen'>
          <Image src="/star.svg" alt="start" width={20} height={20} className=''></Image>
          <h3>{feedback?.totalScore||"---"}/100</h3>
        </div>

      </div>
      <p className='line-clamp-2'>{feedback?.finalAssessment||"You haven't take interview yet.Take it now"} </p>
      <div className='flex-between'>
       <DisplayTechIcons techStack={techstack}/>
        <Button>
          <Link href={feedback?`/interview/${id}/feedback`:`interview/${id}`}>{feedback?'View Feedback':'See Interview'}</Link></Button>
      </div>
    </div>
  )
}

export default InterviewCard
