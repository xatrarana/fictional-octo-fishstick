'use client';
import { cn } from '@/lib/utils';
import React from 'react'



type DangerouslySetInnerHTMLProps = {
    content: string | null,
    className?: string
}



const DangerouslySetInnerHTML = ({content,className}:DangerouslySetInnerHTMLProps) => {
  return (
    <div className={cn(['p-1',className])}
        dangerouslySetInnerHTML={{__html:content || ''}}
    />
  )
}

export default DangerouslySetInnerHTML