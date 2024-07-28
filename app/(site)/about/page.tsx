import dynamic from 'next/dynamic'
import React from 'react'


const AboutWrapper = dynamic(() => import('@/components/about/about-wrapper'), {ssr: true})
const AboutPage = () => {
  return (
    <AboutWrapper/>
  )
}

export default AboutPage