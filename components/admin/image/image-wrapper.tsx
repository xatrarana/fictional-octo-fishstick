import ErrorBoundary from "@/app/_error-boundary";
import Loading from "@/app/admin/loading";
import { Card } from "@/components/ui/card";
import React, { Suspense } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageForm } from "./image-form";
import ImageItems from "./image-items";

const ImageWrapper = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4 flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="font-bold text-slate-800 text-md md:lg:text-xl">
          Image
        </h1>

        <div className="flex gap-x-5">
          <Dialog>
            <DialogTrigger className="px-3 rounded-md py-2 bg-green-800 hover:bg-green-700 text-white">
              Add Image
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Add Image</DialogTitle>
              <DialogDescription>Add a new Image</DialogDescription>
              <div>
                <ImageForm/>
              </div>
            </DialogContent>
          </Dialog>
         
        </div>
      </div>
      <ErrorBoundary>
        <Card>
          <Suspense fallback={<Loading />}>
          <ImageItems/>
          </Suspense>
        </Card>
      </ErrorBoundary>
    </div>
  );
};

export default ImageWrapper;
