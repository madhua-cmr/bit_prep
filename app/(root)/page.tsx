import { Button } from "@/components/ui/button";
import Image from "next/image";
import  InterviewCard  from "@/components/InterviewCard";
import { dummyInterviews } from "@/constants";
export default function Home() {
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
            <Button className="w-[200px] max-sm:w-full  bg-second text-black">
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
          {dummyInterviews.length>0&&(
      dummyInterviews.map((interview)=>(
        <InterviewCard key={interview.id} {...interview}/>
      ))
          )}
          {dummyInterviews.length==0&&(
            <p>You haven&apos;t attend any interviews yet</p>
          )}
      
                    </div>

                      <h2 className="mb-8">Start a New Interview</h2>
                        <div className="interview-section">
          {dummyInterviews.length>0&&(
      dummyInterviews.map((interview)=>(
        <InterviewCard key={interview.id} {...interview}/>
      ))
          )}
          {dummyInterviews.length==0&&(
            <p>There are no Interviews</p>
          )}
        <div className="interview-section">
       
                    </div>
                    </div>

      </section>
    </>
  );
}
