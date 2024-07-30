import { noticeSchema } from "@/schemas";
import React from "react";

import * as z from "zod";
import { Card, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CardFooter } from "react-bootstrap";
import { Badge } from "../ui/badge";

type NoticeCardProps = {
  className?: string;
  notice: z.infer<typeof noticeSchema>;
};

function formatDate(dateString: Date) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const NoticeCard: React.FC<NoticeCardProps> = ({
  className,
  notice,
}: NoticeCardProps) => {
  return (
    <Card className={cn(["bg-green-50", className])}>
      <CardHeader>
        <Link href={`/notices/${notice.id}/details`}>
          <CardTitle className="text-green-700 text-xl">{notice.title}</CardTitle>
        </Link>

        <CardFooter className="">
          <Badge variant="enabled">
            {notice.createdAt ? formatDate(notice.createdAt) : "Loading..."}
          </Badge>
        </CardFooter>
      </CardHeader>
    </Card>
  );
};

export default NoticeCard;
