import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BiSolidEnvelopeOpen,
  BiSolidMapPin,
  BiSolidPhone,
  BiSolidUser,
} from "react-icons/bi";
import { OrganizationSchema } from "@/schemas";
import * as z from "zod";
import { Organization } from "@prisma/client";

type ContactSidebarProps = React.ComponentProps<typeof Card> & {
  data: Organization | null | undefined;
};

export function ContactSideBar({
  data,
  className,
  ...props
}: ContactSidebarProps) {
  return (
    <>
      <Card className={cn(className)} {...props}>
        <CardHeader>
          <CardTitle>सम्पर्क जानकारी</CardTitle>
          <CardDescription>
            तल दिएको जानकारीमा कल गर्नुहोस् वा सन्देश पठाउनुहोस्
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="w-full p-3 rounded-md flex flex-col gap-y-4">
            <div className="flex items-center  rounded-md h-20 p-5">
              <div className="flex items-center justify-center">
                <BiSolidMapPin className="h-8 w-8  text-green-700" />
              </div>
              <div className="data px-3">
                <h3 className="font-semibold mb-2 text-sm  text-slate-800">
                  ठेगाना
                </h3>
                <p className=" text-muted-foreground">{data?.address}</p>
              </div>
            </div>
            <div className="flex items-center  rounded-md h-20 p-5">
              <div className="flex items-center justify-center">
                <BiSolidPhone className="h-8 w-8 text-green-700" />
              </div>
              <div className="data px-3">
                <h3 className="font-semibold mb-2 text-sm text-slate-800">
                  फोन नम्बरहरु
                </h3>
                <p className=" text-muted-foreground">{data?.phone}</p>
              </div>
            </div>
            <div className="flex items-center  rounded-md h-20 p-5">
              <div className="flex items-center justify-center">
                <BiSolidEnvelopeOpen className="h-8 w-8 text-green-700" />
              </div>
              <div className="data px-3">
                <h3 className="font-semibold mb-2 text-sm text-slate-800">
                  इमेल
                </h3>
                <p className=" text-muted-foreground">{data?.email}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {data?.contactPersonName && data.contactPersonPhone && (
        <Card className={cn(className)} {...props}>
          <CardHeader>
            <CardTitle>सम्पर्क व्यक्ति </CardTitle>
            <CardDescription>
              तल दिइएको सम्पर्क व्यक्तिलाई कल गर्नुहोस् वा सन्देश पठाउनुहोस्।
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="w-full p-3 rounded-md flex flex-col gap-y-4">
              <div className="flex items-center  rounded-md h-20 p-5">
                <div className="flex items-center justify-center">
                  <BiSolidUser className="h-8 w-8  text-green-700" />
                </div>
                <div className="data px-3">
                  <h3 className="font-semibold mb-2 text-sm  text-slate-800">
                    नाम
                  </h3>
                  <p className=" text-muted-foreground">
                    {data?.contactPersonName}
                  </p>
                </div>
              </div>
              <div className="flex items-center  rounded-md h-20 p-5">
                <div className="flex items-center justify-center">
                  <BiSolidPhone className="h-8 w-8 text-green-700" />
                </div>
                <div className="data px-3">
                  <h3 className="font-semibold mb-2 text-sm text-slate-800">
                    फोन नम्बर
                  </h3>
                  <p className=" text-muted-foreground">
                    {data?.contactPersonPhone}
                  </p>
                </div>
              </div>
              <div className="flex items-center  rounded-md h-20 p-5">
                <div className="flex items-center justify-center">
                  <BiSolidEnvelopeOpen className="h-8 w-8 text-green-700" />
                </div>
                <div className="data px-3">
                  <h3 className="font-semibold mb-2 text-sm text-slate-800">
                    इमेल
                  </h3>
                  <p className=" text-muted-foreground">
                    {data?.contactPersonEmail}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
