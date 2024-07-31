import ErrorBoundary from '@/app/_error-boundary'
import SiteGalleryWrapper from '@/components/site-gallery/site-gallery-wrapper'
import React from 'react'

const GalleryPage = () => {
  return (
    <ErrorBoundary>
        <SiteGalleryWrapper/>
    </ErrorBoundary>
  )
}

export default GalleryPage