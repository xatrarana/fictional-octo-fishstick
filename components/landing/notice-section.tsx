import { getActiveNoticeItems } from "@/actions/notice";
import ErrorBoundary from "@/app/_error-boundary";
import React from "react";
import NoticeCard from "../notice/notice-card";
import { noticeSchema } from "@/schemas";
import * as z from "zod";

const NoticeSection = async () => {
  const data = await getActiveNoticeItems();
  return (
    <div className="space-y-4 my-3">
      {data && data.success && data.notices && data.notices.length > 0 && (
        <div className=" text-slate-900 py-2 rounded-sm">
          <h1 className="txet-xl ml-5  md:lg:text-2xl font-semibold">
            Notices
          </h1>
        </div>
      )}
      <ErrorBoundary>
        <div className="grid grid-cols-1 md:lg:grid-cols-3  gap-y-3 md:lg:gap-x-5">
          {data &&
            data.success &&
            data.notices &&
            data.notices.slice(0, 3).map((notice) => {
              return (
                <NoticeCard
                  notice={notice as z.infer<typeof noticeSchema>}
                  key={notice.id}
                />
              );
            })}
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default NoticeSection;
