import { CardDetailsLoader, VoidLoader } from '@/constant/Loader'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'

import {JSDOM} from 'jsdom'
import createDomPurify from 'dompurify'
import RelatedScheme from './relate-scheme'
import { Separator } from '../ui/separator'
import DangerouslySetInnerHTML from './dangerously-set-inner-html'
import { getServiceById } from '@/actions/service'


const window = new JSDOM('').window;
const dompurify = createDomPurify(window);


type ServiceDetailsProps = {
    sid: string | null
}
const ServiceDetailsWrapper:React.FC<ServiceDetailsProps> = async ({sid}:ServiceDetailsProps) => {


    if(!sid) return <CardDetailsLoader />
    const data = await getServiceById(sid)

    if(!data) return <CardDetailsLoader />

    if(!data.success) return <VoidLoader />

  return (
    <div className='space-y-6'>
        <div className=''>
       {
        data && !!data.success && data.service && (
            <Card>
            <CardHeader>
                <CardTitle>{data.service?.name}</CardTitle>
            </CardHeader>
            <div className='space-y-5 p-2'>
             
               {
                    data.service.imageUrl && (
                        <Image className='w-full rounded-md object-cover h-[60lvh]' src={data.service.imageUrl} alt={data.service.name} width={200} height={200} />
                    )
                }

                {
                    !data.service.imageUrl && (
                       
                            <Image className='w-full rounded-md object-cover h-[60lvh]' src={'/image-not-found.jpg'} alt={data.service.name} width={900} height={200} />
                    )
                }
              <div className='mt-4'>
              {
                    data.service.text && (
                        <DangerouslySetInnerHTML content={dompurify.sanitize(data.service.text || '')} />
                    )
                    
               }
              </div>
            </div>
        </Card>
        )
       }
    </div>
    <Separator/>
         <RelatedScheme sid={data.service.id} />
    </div>
  )
}

export default ServiceDetailsWrapper





