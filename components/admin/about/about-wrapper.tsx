import { getAbouts } from "@/actions/about";
import ErrorBoundary from "@/app/_error-boundary";
import { Card } from "@/components/ui/card";
import React, { Suspense } from "react";

const AboutFormSkeleton = () => {
  return (
    <div className="flex w-52 flex-col gap-4">
      <div className="skeleton h-18 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );
};


const AboutFormLazy = React.lazy(() => import("./about-form"));

const AboutWrapper = async () => {
  const aboutData = await getAbouts();
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="font-bold text-slate-800 text-md md:lg:text-xl">
          About Page Configuration
        </h1>
      </div>
      <ErrorBoundary>
        <Card>
          <Suspense fallback={<AboutFormSkeleton/>}>
            <AboutFormLazy data={aboutData} />
          </Suspense>
        </Card>
      </ErrorBoundary>
    </div>
  );
};

export default AboutWrapper;
