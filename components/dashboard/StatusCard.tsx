import React from 'react'

interface statusType{
    statusName: string,
    statusNum: number,
}

const StatusCard = ({statusName, statusNum}:statusType) => {
  return (
    <div className='border-2 border-muted-foreground/50 rounded-lg px-4 py-2 '>
        <h1 className='text-xl font-base'>{statusName} Issues</h1>
        <h1 className='text-2xl font-bold'>{statusNum}</h1>
    </div>
  )
}

export default StatusCard