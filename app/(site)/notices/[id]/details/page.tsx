import { getNoticeById } from "@/actions/notice";
import NotFound from "@/app/not-found";
import { CardLoader } from "@/constant/Loader";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { BiSolidDownload } from "react-icons/bi";
import dynamic from "next/dynamic";

function formatDate(dateString: Date) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const RelatedNotices = dynamic(
  () => import("@/components/notice/_relate-notices"),
  { loading: () => <CardLoader /> }
);

const NoticeDetails = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return <CardLoader />;
  const response = await getNoticeById(params.id);

  const { notice } = response;

  return (
    <div className="space-y-6 min-h-screen pb-4">
      <Breadcrumb className="p-1">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/notices/`}>notices</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{notice?.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className=" grid grid-cols-1  md:lg:grid-cols-5  md:lg:gap-x-4">
        <div className="col-span-3">
          {notice && (
            <Card className="">
              <CardHeader>
                <CardTitle className="text-green-700 text-xl">
                  {notice.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col gap-4 items-center justify-between">
                <Link
                  target="_blank"
                  download={notice.title}
                  href={notice.fileUrl as string}
                  className="flex gap-x-5 py-2 px-3 text-white bg-green-800 hover:bg-green-700 rounded-md"
                >
                  <BiSolidDownload className="w-6 h-6 text-white font-bold flex items-center " />
                  Download
                </Link>
                <Image
                  className="rounded-md"
                  layout="responsive"
                  src={notice.fileUrl as string}
                  width={200}
                  height={200}
                  alt={notice.title}
                />
              </CardContent>

              <CardFooter>
                <Badge variant="enabled">
                  {notice.createdAt
                    ? formatDate(notice.createdAt)
                    : "Loading..."}
                </Badge>
              </CardFooter>
            </Card>
          )}

          {!response.notice && <NotFound />}
        </div>

        <Card className="col-span-2 p-3">
          <CardHeader>
            <CardTitle className="text-green-700 text-xl">
              Related Notices
            </CardTitle>
          </CardHeader>

          <CardContent>
            <RelatedNotices id={params.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NoticeDetails;
