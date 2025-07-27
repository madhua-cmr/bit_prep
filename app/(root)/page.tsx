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
      <section>
        <div className="banner  flex-between">
          <div className="flex-c">
            <h2>Ace Your Next Interview with AI-Powered Mock Interviews</h2>
            <h3>
              Practice anytime, get instant feedback, and boost your confidence
              with personalized AI coaching.
            </h3>
            <Button className="w-[200px] max-sm:w-full  bg-second text-black hover:text-white ">
              <Link href="/interview"></Link>
              Get Started for free
            </Button>
          </div>
          <div className="">
            <Image
              src="/robot.png"
              alt="robot"
              width={300}
              height={300}
              className="rounded-md max-sm:hidden"
            />
          </div>
        </div>
      </section>
      <section >
        <h2 >Interview history</h2>
        <div className="interview-section">
          {haspastInterviews?(
      myinterviews?.map((interview)=>(
        <InterviewCard     key={interview.id}
                userId={user?.id}
                id={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}/>
      ))):(    <p>You haven&apos;t attend any interviews yet</p>)
          }
        
                    </div>

                      <h2 className="mb-8">Start a New Interview</h2>
                        <div className="interview-section">
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
          ):(     <p>There are no Interviews</p>)}
       
      
                    </div>

      </section>
    </>
  );
}
