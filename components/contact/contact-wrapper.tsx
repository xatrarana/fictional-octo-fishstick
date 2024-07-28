import React, { Suspense } from 'react'
import { ContactSideBar } from './contact-side-bar'
import dynamic from 'next/dynamic'
import { GetDetailsData } from '@/data/org'
import { OrganizationSchema } from '@/schemas'
import * as z from 'zod'
import { Organization } from '@prisma/client'
const MapWrapper = dynamic(() => import('./map-wrapper'), {ssr: true})



const ContactWrapper = async ({children}:{children:React.ReactNode}) => {
  const response = await GetDetailsData()
  return (
    <div className='space-y-6'>
    <div className='grid grid-cols-1 md:lg:grid-cols-2 p-2 gap-2'>
        <div className=''>
            <ContactSideBar data={response} className='border-none' />
        </div>
        <div className='flex flex-1'>
            {children}
        </div>
    </div>
    <div>
      <Suspense fallback={<MapLoader/>}>
      <MapWrapper src={response?.mapUrl ?? ''}/>
      </Suspense>
    </div>
    </div>
  )
}

export default ContactWrapper


const MapLoader = () => {
  return <span className="loading loading-spinner loading-lg"></span>
}