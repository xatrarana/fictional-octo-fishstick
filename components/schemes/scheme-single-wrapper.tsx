import { getCategoryById } from "@/actions/category";
import { CardDetailsLoader, VoidLoader } from "@/constant/Loader";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { JSDOM } from "jsdom";
import createDomPurify from "dompurify";
import RelatedScheme from "./relate-scheme";
import { Separator } from "../ui/separator";
import DangerouslySetInnerHTML from "./dangerously-set-inner-html";

const window = new JSDOM("").window;
const dompurify = createDomPurify(window);

type SchemeDetailsProps = {
  sid: string | null;
};
const SchemeDetailsWrapperSite: React.FC<SchemeDetailsProps> = async ({
  sid,
}: SchemeDetailsProps) => {
  if (!sid) return <CardDetailsLoader />;
  const data = await getCategoryById(sid);

  if (!data) return <CardDetailsLoader />;

  if (!data.success) return <VoidLoader />;

  return (
    <div className="space-y-6 my-3">
      <Breadcrumb className="p-1">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/schemes/${sid}`}>
              {data.category.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data.category.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="">
        {data && !!data.success && data.category && (
          <Card>
            <CardHeader>
              <CardTitle>{data.category?.name}</CardTitle>
            </CardHeader>
            <div className="space-y-5 p-2">
             <div className="flex items-center justify-center">
             {data.category.categoryImageUrl && (
              /* eslint-disable-next-line */
                <img
                  className="w-full h-auto md:lg:h-[60vh] rounded-md object-cover object-center"
                  src={data.category.categoryImageUrl}
                  alt={data.category.name}
                  width={300}
                  height={200}
                />
              )}

              {!data.category.categoryImageUrl && (
                <Image
                  className=" rounded-md object-fit object-center"
                  src={"/image-not-found.jpg"}
                  alt={data.category.name}
                  width={400}
                  height={200}
                />
              )}
             </div>
              <div className="mt-4">
                {data.category.text && (
                  <DangerouslySetInnerHTML
                    content={dompurify.sanitize(data.category.text || "")}
                  />
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
      <Separator />
      <RelatedScheme sid={data.category.id} />
    </div>
  );
};

export default SchemeDetailsWrapperSite;
