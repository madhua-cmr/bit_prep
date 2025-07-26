"use client"

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
enum Callstatus{
 ACTIVE="ACTIVE",
 INACTIVE="INACTIVE",
 CONNECTING="CONNECTING",
 FINISHED="FINISHED"
}
interface savedMessage{
  role:'user'|'system'|'assistant',
  content:string
}
const Agent = ({userName,type,userId}:AgentProps) => {
  const router=useRouter();
  const [isSpeaking,setIsSpeaking]=useState(false);
  const [callstatus,setCallstatus]=useState<Callstatus>(Callstatus.INACTIVE)
const[messages,setMessages]=useState<savedMessage[]>([]);



useEffect(()=>{
const onCallStart=()=>setCallstatus(Callstatus.ACTIVE);
const onCallEnd=()=>{
  setCallstatus(Callstatus.FINISHED)
}
const onMessage=(message:Message)=>{
 
  if(message.type==="transcript"&&message.transcriptType==="final"){
    const newMessage:savedMessage={
      role:message.role,
      content:message.transcript
    }
setMessages((prev)=>[...prev,newMessage])
  }
}

const onSpeechStart=()=>setIsSpeaking(true);
const onSpeechEnd=()=>setIsSpeaking(false);
const onError=(error:Error)=>{
  console.log("Error",error);
}
vapi.on('call-start',onCallStart);
vapi.on("call-end",onCallEnd);
vapi.on("error",onError)
vapi.on('message',onMessage);
vapi.on('speech-start',onSpeechStart);
vapi.on('speech-end',onSpeechEnd)


return ()=>{
  vapi.off('call-start',onCallStart);
vapi.off("call-end",onCallEnd);
vapi.off("error",onError)
vapi.off('message',onMessage);
vapi.off('speech-start',onSpeechStart);
vapi.off('speech-end',onSpeechEnd)


}
},[])

useEffect(()=>{
  if(callstatus===Callstatus.FINISHED) router.push("/");
},[messages,callstatus,type,userId])

const handleCall=async()=>{
  setCallstatus(Callstatus.CONNECTING);
  if(type==="generate"){

  await vapi.start(
    undefined,
    undefined,
    undefined,
    process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!,
    {
    variableValues:{
      username:userName,
      userid:userId
    }
  }
)
}
}

const handleDisconnect=async()=>{
  setCallstatus(Callstatus.FINISHED);
  vapi.stop()
}

const latestMessage=messages[messages?.length-1]?.content;


const isCallInactiveOrFinished=callstatus===Callstatus.INACTIVE||callstatus===Callstatus.FINISHED

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
<Image src="/profile.svg" width={100} height={100} alt="robo" className='rounded-full object-fit'/>
          {isSpeaking&& <div className=' absolute opacity-50 flex-row-cen w-[130px] h-[130px] rounded-full bg-slate-400 animate-ping'></div>}
        </div>
           <h3>{userName}</h3>
        </div>

      
      </div>

       <div className="flex-row-cen">
      {callstatus!=="ACTIVE"?(
  <button className="green-btn flex-row-cen relative" onClick={handleCall}><span className={cn(' absolute animate-ping rounded-full opacity-80',callstatus!=Callstatus.CONNECTING&&'hidden')}>
    {isCallInactiveOrFinished?'Call':'. . .'}
    </span></button>
      ):(
<button className="red-button  flex-row-cen " onClick={handleDisconnect}>
  <span>End</span>
</button>
      )}
     </div>

      <div className="flex-row-cen">
        
        {messages.length>0&&<div><p className="text-card">{latestMessage} </p></div>}
       
      </div>
        
    
  
  
</>
  )
}

export default Agent
