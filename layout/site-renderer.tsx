import React from 'react'
import SiteLayout from './site-layout'
import { getBanners } from '@/actions/banner'
import dynamic from 'next/dynamic'


const EmblaCarousel = dynamic(() => import('@/components/landing/sections/EmblaCarousel'), {ssr: true})
const SiteRender = async () => {
 const response = await getBanners()
  return (
    <SiteLayout>
      <section className=''>
        <div className=''>
          <EmblaCarousel slides={response}/>
        </div>
      </section>
    </SiteLayout>
  )
}

export default SiteRender