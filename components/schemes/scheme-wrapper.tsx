import { getCategories, getCategoryById } from '@/actions/category'
import { CardLoader } from '@/constant/Loader'
import React from 'react'


type SchemeWrapperSiteProps = {
    sid: string | null
}
const SchemeWrapperSite:React.FC<SchemeWrapperSiteProps> = async ({sid}:SchemeWrapperSiteProps) => {


    if(!sid) return <CardLoader len={6} />
    const data = await getCategories()

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        
    </div>
  )
}

export default SchemeWrapperSite





