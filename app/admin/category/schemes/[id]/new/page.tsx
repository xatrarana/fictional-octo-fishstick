import { SchemeForm } from '@/components/admin/schemes/schemes-form'
import React from 'react'


const SchemeNewFormPages = ({ params }: { params:{id:string} }) => {

    console.log(params.id);
    return (
    <SchemeForm cid={params.id}/>
  )
}

export default SchemeNewFormPages