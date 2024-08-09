import { getCategories } from '@/actions/category'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Content from '../content'
import Link from 'next/link'
import Image from 'next/image'

const ServicesSection = async () => {
  const services = await getCategories()
  return (
   <div className='space-y-5'>
    {
      services && services.categories && services.categories.length > 0 && (
        <div className=' text-slate-900 py-2 rounded-sm'>
      <h1 className='txet-xl ml-5  md:lg:text-2xl font-semibold'>Services</h1>
    </div>
      )
    }
     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 '>


{
  services && services.categories && services.categories.slice(0, 6).map((service, index) => (
    <Link
    key={service.id}
      href={`/schemes/${service.id}`}
    >
      <Card className=''>
        <CardHeader>
          <CardTitle className='text-green-950'>{service?.name}</CardTitle>
        </CardHeader>
        <CardContent className='flex items-center justify-center'>
          {/* eslint-disable-next-line */}
          <img
            src={service?.categoryImageUrl || '/image-not-found.jpg'}
            alt={service?.name}
            width={100}
            height={50}
            loading='lazy'
            className='rounded-md object-cover'
          />
        </CardContent>
        <Content className='text-justify bg-green-50 p-3 hover:text-muted-foreground' content={service?.text?.slice(0,170) + " ..." as string } />
      </Card>
    </Link>
  ))
}
</div>
   </div>
  )
}

export default ServicesSection