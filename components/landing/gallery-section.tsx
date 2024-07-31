import { getImages } from "@/actions/image";
import ErrorBoundary from "@/app/_error-boundary";
import { Image } from "@prisma/client";
import React from "react";
import GalleryComp from "../site-gallery/gallery";

const GallerySection = async () => {
  const response = await getImages();
  const galleryImages =
  response &&
  response.Images &&
  response.Images.slice(0,4).map((img: Image) => (
      {
    original: img.url,
    thumbnail: img.url, 
    altText: img.altText,
  }



));
  return (
    <div className="space-y-4 my-3">
    {galleryImages && galleryImages && galleryImages.length > 0 && (
      <div className=" text-slate-900 py-2 rounded-sm">
        <h1 className="txet-xl ml-5  md:lg:text-2xl font-semibold">
          Gallery
        </h1>
      </div>
    )}
    <ErrorBoundary>
      {galleryImages &&  <GalleryComp images={galleryImages} />}
    </ErrorBoundary>
  </div>
  )
};

export default GallerySection;
