import { GetDetails } from '@/actions/org-details'
import Image from 'next/image'
import React from 'react'

const DashBoardPage = async () => {
  const data = await GetDetails()
  return (
    <div>
      {
        data && data.primaryLogoUrl && (
          <Image alt={data.name} src={data.primaryLogoUrl} width={200} height={200} />
        )
      }
    </div>
  )
}

export default DashBoardPage