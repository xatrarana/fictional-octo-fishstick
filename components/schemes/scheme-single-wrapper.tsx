import { getCategoryById } from '@/actions/category'
import { CardDetailsLoader, VoidLoader } from '@/constant/Loader'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'

import {JSDOM} from 'jsdom'
import createDomPurify from 'dompurify'
import RelatedScheme from './relate-scheme'
import { Separator } from '../ui/separator'
import DangerouslySetInnerHTML from './dangerously-set-inner-html'


const window = new JSDOM('').window;
const dompurify = createDomPurify(window);


type SchemeDetailsProps = {
    sid: string | null
}
const SchemeDetailsWrapperSite:React.FC<SchemeDetailsProps> = async ({sid}:SchemeDetailsProps) => {


    if(!sid) return <CardDetailsLoader />
    const data = await getCategoryById(sid)

    if(!data) return <CardDetailsLoader />

    if(!data.success) return <VoidLoader />

  return (
    <div className='space-y-6'>
        <div className=''>
       {
        data && !!data.success && data.category && (
            <Card>
            <CardHeader>
                <CardTitle>{data.category?.name}</CardTitle>
            </CardHeader>
            <div className='space-y-5 p-2'>
             
               {
                    data.category.categoryImageUrl && (
                        <Image className='w-full rounded-md object-cover h-[60lvh]' src={data.category.categoryImageUrl} alt={data.category.name} width={200} height={200} />
                    )
                }

                {
                    !data.category.categoryImageUrl && (
                       
                            <Image className='w-full rounded-md object-cover h-[60lvh]' src={'/image-not-found.jpg'} alt={data.category.name} width={900} height={200} />
                    )
                }
              <div className='mt-4'>
              {
                    data.category.text && (
                        <DangerouslySetInnerHTML content={dompurify.sanitize(data.category.text || '')} />
                    )
                    
               }
              </div>
            </div>
        </Card>
        )
       }
    </div>
    <Separator/>
         <RelatedScheme sid={data.category.id} />
    </div>
  )
}

export default SchemeDetailsWrapperSite





