import { Button } from "@/components/ui/button";
import Image from "next/image";
import  InterviewCard  from "@/components/InterviewCard";

import {  getUser } from "@/lib/admin.action";
import {getInterviews, getInterviewsByuserId,} from "@/lib/general.action";
import Link from "next/link";

export default async function Home() {
  const user=await getUser();
  const[myinterviews,interviews]=await Promise.all([
getInterviewsByuserId(user?.id),
getInterviews({userId:user?.id})
  ])
  const haspastInterviews=myinterviews?.length!>0;

  const hasInterviews=interviews?.length!>0;
 
  return (
    <>
      <section className="bg-[url('/home.jpg')] bg-cover bg-center w-screen text-a">
        <div className="relative  h-[450px]">
          
             <div className=" w-full absolute left-2 top-7 sm:top-0 md:left-5 lg:left-56 p-4 sm:p-14">
          
          
          <div className="flex flex-col gap-2 sm:gap-8 max-w-[500px]">
            <h1>Ace Your Next Interview with AI-Powered Mock Interviews</h1>
            <h2 className=" text-justify">
              Practice anytime, get instant feedback, and boost your confidence
              with personalized AI coaching.
            </h2>
            <Button className="max-w-[250px] p-4 max-sm:w-full  ring-1 ring-slate-600 shadow-lg shadow-slate-900 bg-three text-shadow-white text-[18px] hover:bg-blue-400 cursor-pointer">
              <Link href="/interview">Create your own interview</Link>
           
            </Button>
            </div>
          </div>
       
         
        </div>
      </section>
      <section  className=" text-center mt-8">
        <h2 >Interviews created by you</h2>
        <div className="interview-section  ">
          {haspastInterviews?(
      myinterviews?.map((interview)=>(
        <InterviewCard     key={interview.id}
                userId={user?.id}
                id={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}/>
      ))):(    <p className="text-center">You haven&apos;t attend any interviews yet</p>)
          }
        
                    </div>
              <h2 className="mb-8">More Interviews for you</h2>
                        <div className="interview-section ">
          {hasInterviews?(
     interviews?.map((interview)=>(
        <InterviewCard   key={interview.id}
                userId={user?.id}
                id={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}/>
                  
      ))
          ):(  <div className="text-center w-full ">
  <h3>There are no Interviews</h3>
</div> )}
     </div>
      

      </section>
    </>
  );
}
