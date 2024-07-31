import React, { Suspense } from "react";
import SiteLayout from "./site-layout";
import { getBanners } from "@/actions/banner";
import dynamic from "next/dynamic";
import { Separator } from "@/components/ui/separator";

const OrgIntro = dynamic(() => import("@/components/landing/org-intro"), {
  ssr: true,
});

const ServicesSection = dynamic(() => import("@/components/landing/services-section"), {
  ssr: true,
});

const GallerySection = dynamic(() => import("@/components/landing/gallery-section"), {
  ssr: true,
});

const NoticeSection = dynamic(() => import("@/components/landing/notice-section"), {
  ssr: true,
});

const EmblaCarousel = dynamic(
  () => import("@/components/landing/sections/EmblaCarousel"),
  { ssr: false }
);
const SiteRender = async () => {
  const response = await getBanners();
  return (
    <SiteLayout>
      <section className="space-y-3">
        <EmblaCarousel slides={response} />

      </section>
      <Separator/>
      <section className="space-y-6">
        <OrgIntro />

      </section>
      <Separator/>
      <section className="space-y-6">
        <ServicesSection />
      </section>
      <Separator/>
      <section className="space-y-3">
        <GallerySection />
      </section>
      <Separator/>
      <section className="space-y-6">
        <NoticeSection />
      </section>
    </SiteLayout>
  );
};

export default SiteRender;




