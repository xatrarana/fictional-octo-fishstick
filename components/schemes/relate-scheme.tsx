import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { getServicesRelatedToCategory } from "@/actions/category";
import { Service } from "@prisma/client";
import Image from "next/image";
import DangerouslySetInnerHTML from "./dangerously-set-inner-html";
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import { TruncateString } from "@/constant/truncate-component";
import Link from "next/link";

const window = new JSDOM('').window;
const purify = DOMPurify(window);


type RelatedSchemeProps = {
  sid: string;
};
const RelatedScheme = async ({ sid }: RelatedSchemeProps) => {
  const services = await getServicesRelatedToCategory(sid);

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:lg:gap-4">
      {services &&
        !!services.success &&
        services.services &&
        services.services.map((service: Service) => (
         <Link  key={service.id} href={`/schemes/details/${service.id}`}>
          <Card className="hover:cursor-pointer" >
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {service.imageUrl && (
                /* eslint-disable-next-line */
                <img
                  className="rounded-md object-cover w-full h-36"
                  src={service.imageUrl}
                  alt={service.name}
                  width={200}
                  height={200}
                />
              )}

              {!service.imageUrl && (
                <Image
                  className="w-full rounded-md object-cover  h-36"
                  src={"/image-not-found.jpg"}
                  alt={service.name}
                  width={200}
                  height={200}
                />
              )}
            </CardContent>
            <div className="text-center">
                    <DangerouslySetInnerHTML content={purify.sanitize(service.text?.slice(0,150)+" ..." || '')} />
            </div>
          </Card>
         </Link>
        ))}
    </div>
  );
};

export default RelatedScheme;
