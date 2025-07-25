import { cn } from "@/lib/utils";
import Image from "next/image"
enum Callstatus{
 ACTIVE="ACTIVE",
 INACTIVE="INACTIVE",
 CONNECTING="CONNECTING",
 FINISHED="FINISHED"
}
const Agent = ({userName}:AgentProps) => {
  const isSpeaking=false;
  const callstatus=Callstatus.ACTIVE;
  const messages=[
    "hi",
    "hello",
    "how are you",
    "fine,how are you ?"
  ]
  const lastMessage=messages[messages.length-1]

  return (
<>
<div className='flex-between gap-8'>
  <div className='container gap-8'>
 
    <div className='relative flex-row-cen w-[130px] h-[130px] rounded-full bg-slate-400'>
<Image src="/robo1.jpeg" width={100} height={100} alt="robo" className='rounded-full object-fit'/>
        {isSpeaking&& <div className=' absolute opacity-50 flex-row-cen w-[130px] h-[130px] rounded-full bg-slate-400 animate-ping'>
          </div>}
        </div>
           <h3>AI Interviewer</h3>
        </div>
 
 <div className='container gap-8'>
 
      <div className='relative flex-row-cen w-[130px] h-[130px] rounded-full bg-slate-400'>
<Image src="/robo1.jpeg" width={100} height={100} alt="robo" className='rounded-full object-fit'/>
          {isSpeaking&& <div className=' absolute opacity-50 flex-row-cen w-[130px] h-[130px] rounded-full bg-slate-400 animate-ping'></div>}
        </div>
           <h3>{userName}</h3>
        </div>

      
      </div>

       <div className="flex-row-cen">
      {callstatus!=="ACTIVE"?(
  <button className="green-btn flex-row-cen relative"><span className={cn(' absolute animate-ping rounde-full opacity-80',callstatus!=="CONNECTING"&'hidden')}>
    {callstatus==="INACTIVE"||callstatus==="FINISHED"?'Call':'. . .'}
    </span></button>
      ):(
<button className="red-button  flex-row-cen ">
  <span>End</span>
</button>
      )}
     </div>

      <div className="flex-row-cen">
        
        {messages.length>0&&<div><p className="text-card">{lastMessage} </p></div>}
       
      </div>
        
    
  
  
</>
  )
}

export default Agent
