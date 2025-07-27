import Agent from "@/components/Agent";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import { getUser } from "@/lib/admin.action";
import getInterviewDetailsById from "@/lib/general.action";
import { getRandomInterviewCover } from "@/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";

const page = async({params}:RouteParams) => {

  const {id}=await params;
  const user=await getUser();
  if(!id){
    redirect("/");
    
  }
  const interview=await getInterviewDetailsById(id);

  return (
  <div className="flex-c">
    <div className="flex flex-row justify-between items-start ">
 <Image src={getRandomInterviewCover()} alt="companylogo" width={50} height={50}></Image>
   <div className="flex-c">
    <h2 className="capitalize">{interview?.role} Interview</h2>
<DisplayTechIcons techStack={interview?.techstack}/>
   </div>
   <div className="card-sm"><p className="text-[16px] font-semibold">{interview?.type}</p></div>
    </div>
    <div className="">
  <Agent userName={user?.name} userId={user?.id} interviewId={id} type="interview" questions={interview?.questions} />
    
    </div>

  </div>
  )
}

export default page
