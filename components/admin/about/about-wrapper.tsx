import { getAbouts } from '@/actions/about'
import { Card } from '@/components/ui/card'
import React from 'react'
import AboutForm from './about-form'


const AboutWrapper = async () => {
    const aboutData = await getAbouts()
  return (
    <div className='space-y-6'>
        <div className="space-y-4">
        <h1 className="font-bold text-slate-800 text-md md:lg:text-xl">
          About Page Configuration
        </h1>
      </div>
           <Card>
            <AboutForm data={aboutData}/>
           </Card>
    </div>
  )
}

export default AboutWrapper