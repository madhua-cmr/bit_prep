import { cn, getTechLogos } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const DisplayTechIcons = async({techStack}:TechIconProps) => {
  const techIcons=await getTechLogos(techStack)
  return (
    <div className='flex-row-c '>
    { techIcons.slice(0,3).map(({tech,url},index)=>(
<div className={cn('relative group bg-slate-200 rounded-full p-2 ',index>=1&&'-ml-3')} key={tech}>
  <span className='tech-tooltip'>{tech}</span>
  <Image src={url} alt={tech} width={100} height={100} className='size-5 '></Image>
</div>
    ))}
    </div>
  )
}

export default DisplayTechIcons
