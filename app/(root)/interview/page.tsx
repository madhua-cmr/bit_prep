import Agent from '@/components/Agent'
import { getUser } from '@/lib/admin.action'

import React from 'react'

const page = async() => {
  const user=await getUser();

  return (
    <div className='flex-c '>
      <h2>Generate Interview</h2>
<Agent userName={user?.name} userId={user?.id} type="generate" />
   
    </div>
  )
}

export default page
