'use client';
import React, { use, useEffect } from 'react'
import { Button } from './ui/button';
import { BiRefresh } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

const RefreshButton = () => {
    const router = useRouter()


    const handleRefresh = () => {
        router.refresh()
    }

    useEffect(() => handleRefresh,[router])
  return (
    <Button variant={"ghost"} onClick={handleRefresh}>
        <BiRefresh className='w-5 h-5 text-green-500' />
    </Button>
  )
}

export default RefreshButton