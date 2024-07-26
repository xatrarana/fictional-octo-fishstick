'use client';
import React, { use, useCallback, useEffect } from 'react'
import { Button } from './ui/button';
import { BiRefresh } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

const RefreshButton = () => {
    const router = useRouter()


    const handleRefresh = useCallback(() => {
        router.refresh()
    },[router])

    useEffect(() => handleRefresh,[router,handleRefresh])
  return (
    <Button variant={"ghost"} onClick={handleRefresh}>
        <BiRefresh className='w-5 h-5 text-green-500' />
    </Button>
  )
}

export default RefreshButton