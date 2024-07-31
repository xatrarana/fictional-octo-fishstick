import { getImages } from "@/actions/image";
import { Image } from "@prisma/client";
import React from "react";
import GalleryComp from "./gallery";
import { ImageDetailsLoader, VoidLoader } from "@/constant/Loader";

const SiteGalleryWrapper:React.FC = async () => {
  const response = await getImages();

  const galleryImages =
    response &&
    response.Images &&
    response.Images.map((img: Image) => (
        {
      original: img.url,
      thumbnail: img.url, 
      altText: img.altText,
    }



));

  
  return (
    <div>
     {galleryImages &&  <GalleryComp images={galleryImages} />}
     {
         galleryImages && galleryImages.length < 0 &&  <VoidLoader/>
     }
     {
            !galleryImages && <ImageDetailsLoader/>
     }
    </div>
  );
};

export default SiteGalleryWrapper;
