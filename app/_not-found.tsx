import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFoundForLayout = () => {
  return (
    <div className="flex items-center justify-center ">
    <div className="max-w-md  w-full mx-auto text-center  p-4">
      <div className="mb-8 flex items-center justify-center">
        <Image
          src="/not-found.svg" 
          alt="Not Found"
          width={300}
          height={300}
        />
      </div>
      <h1 className="text-2xl text-slate-900 font-bold mb-4">Page Not Found</h1>
      <p className="text-gray-700 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className="text-green-500 hover:underline">
        Go back to the homepage
      </Link>
    </div>
  </div>
  )
}

export default NotFoundForLayout