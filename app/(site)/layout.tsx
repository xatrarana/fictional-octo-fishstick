import SiteLayout from '@/layout/site-layout'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <SiteLayout>
        {children}
    </SiteLayout>
  )
}

export default layout