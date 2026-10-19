import React from 'react';
import Announcement from './Announcement';

const AnnouncementList = ({ announcements, markAsRead }) => {
  return (
    <div>
      {announcements.length === 0 ? (
        <p className="py-4 text-gray-600">No unread announcements</p>
      ) : (
        <div className="grid gap-4">
          {announcements.map((announcement, index) => (
            <Announcement key={index} {...announcement} markAsRead={() => markAsRead(announcement)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementList;