import Footer from '@/components/common/footer'
import NavBar from '@/components/common/nav-bar'
import React from 'react'

const SiteLayout:React.FC<LayoutProps> = ({children}:LayoutProps) => {
  return (
    <>
    <NavBar />
    <main className='w-full max-w-7xl mx-auto p-2'>
        {children}
    </main>
    <Footer />
</>
  )
}

export default SiteLayout