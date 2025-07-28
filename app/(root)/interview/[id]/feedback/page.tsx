import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/admin.action"
import getInterviewDetailsById, { getFeedbackByInterviewId } from "@/lib/general.action";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const page = async({params}:RouteParams) => {
  const{id}=await params
  const user=await getUser();
  const interview=await getInterviewDetailsById(id)
  const feedback=await getFeedbackByInterviewId({interviewId:id,userId:user?.id});
  console.log(feedback)
  const date=await dayjs(feedback?.createdAt).format('MMM D YYYY')
  return (
<><div className="p-10 w-full md:w-[1/2vw]">
    <div className="flex-col-cen   gap-8 ">
      <div className="flex-c gap-4">
        <h1>Feedback on the Interview - {interview?.role}</h1>
        <div className="flex-between">
        <div className="flex-r"><Image src="/star.svg" alt="star" width={25} height={25} ></Image>
        <h3>Overall Impression : {feedback?.totalScore}/100</h3></div>
        <div className="flex-r"><Image src="/calendar.svg" alt="calendar" width={25} height={25} ></Image>
        <h3>{date}</h3></div>
        </div>

      </div>
  <div className="h-0.5 bg-three  w-full  rounded-full"></div>
      <div className="mb-4">
        <p className="leading-8 text-[18px] font-medium">{feedback?.finalAssessment}</p>
        {feedback?.categoryScores&&(<div className="my-4"><h2 className="my-4">Breakdown of the Interview:</h2>
    {
      feedback.categoryScores.map((cate,index)=>{
        const comments=cate.comment.split(".")
        comments.pop()
       return  <div key={index} className="leading-10 text-[18px]">
          <h3 className="font-semibold">{`${index+1} . ${cate?.name} (${cate.score} / 100)`} </h3>
          <ul className=" leading-8 list-disc list-inside">
            {comments.map((comm,index)=>(
              <li key={index}>{comm}</li>
            ))}
          </ul>
          </div>
})
    }

        </div>)}

     {feedback?.strengths.length>0&&( <div className="my-4 leading-8  ">
        <h2 className="my-4">Strengths</h2>
        <ul className="list-disc list-inside text-[18px]">
            {feedback.strengths.map((strength,index)=>(
              <li key={index}>{strength}</li>
            ))}
          </ul>
      </div>)}
      {feedback?.areasForImprovement?.length>0&&(
 <div className="my-4">
        <h2 className="my-4">Area for Improvements</h2>
         <ul className="text-[18px] leading-8 list-disc list-inside">
            {feedback.areasForImprovement.map((area,index)=>(
              <li key={index}>{area}</li>
            ))}
          </ul>
      </div>
      )}
     
    </div>
    <div>
      <Button className="text-[18px] bg-three text-[#f9f9f9] p-2 "><Link href="/">Back to dashboard</Link></Button>
    </div>
    </div>
    </div></>
  )
}

export default page
