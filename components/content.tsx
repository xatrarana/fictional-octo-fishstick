
import { cn } from '@/lib/utils';
import React from 'react'
import DOMPurify from 'dompurify'
import {JSDOM} from 'jsdom';



type ContentProps = {
    content: string,
    className?: string
    style?: React.CSSProperties
    
}
const Content = ({content,className,style}:ContentProps) => {
  const window = new JSDOM("").window;
  const DOMPurifyServer = DOMPurify(window);
  return (
    <div style={style} dangerouslySetInnerHTML={{__html:DOMPurifyServer.sanitize(content)}} className={cn('',className)}/>
  )
}

export default Content