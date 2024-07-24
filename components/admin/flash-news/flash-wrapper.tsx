import ErrorBoundary from "@/app/_error-boundary";
import Loading from "@/app/admin/loading";
import { Card } from "@/components/ui/card";
import React, { Suspense } from "react";
import FlashItems from "./flash-items";
import { FlashAddDialog } from "./flash-form";
import RefreshButton from "@/components/refresh-button";

const FlashWrapper = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4 flex justify-between items-center">
        <h1 className="font-bold text-slate-800 text-md md:lg:text-xl">
          Flash News Configuration
        </h1>
        <div className="flex items-center justify-center gap-x-2">
          <RefreshButton />
          <FlashAddDialog />
        </div>
      </div>
      <ErrorBoundary>
        <Card>
          <Suspense fallback={<Loading />}>
            <FlashItems />
          </Suspense>
        </Card>
      </ErrorBoundary>
    </div>
  );
};

export default FlashWrapper;
