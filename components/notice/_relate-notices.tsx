import { getActiveNoticeItems } from '@/actions/notice';
import NotFound from '@/app/not-found';
import React from 'react';
import NoticeCard from './notice-card';
import { noticeSchema } from '@/schemas';
import * as z from 'zod';

const RelatedNotices = async ({ id }: { id: string }) => {
  const response = await getActiveNoticeItems();

  if (response && response.success && response.notices) {
    const filteredNotices = response.notices.filter(
      (notice) => notice.id !== id
    );

    if (filteredNotices.length === 0) {
      return <NotFound />;
    }

    return (
      <div className='space-y-3'>
        {filteredNotices.map((notice) => (
          <NoticeCard
            key={notice.id}
            notice={notice as z.infer<typeof noticeSchema>}
          />
        ))}
      </div>
    );
  }

  return <NotFound />;
};

export default RelatedNotices;
