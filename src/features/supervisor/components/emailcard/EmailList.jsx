import React, { useState } from 'react';
import EmailCard from './EmailCard';

const EmailList = ({ emails }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');

  // Filter and sort the emails based on the current search, sorting, and filtering options
  const filteredEmails = emails.filter((email) =>
  (email.sender?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  email.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  email.content?.toLowerCase().includes(searchQuery.toLowerCase()))
).filter((email) =>
  filterBy === 'all' || (filterBy === 'unread' && !email.read) || (filterBy === 'read' && email.read)
).sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'sender') {
      return a.sender.localeCompare(b.sender);
    } else if (sortBy === 'subject') {
      return a.subject.localeCompare(b.subject);
    }
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border rounded py-2 px-4 mr-2"
        />
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="border rounded py-2 px-4 mr-2"
        >
          <option value="date">Sort by Date</option>
          <option value="sender">Sort by Sender</option>
          <option value="subject">Sort by Subject</option>
        </select>
        <select
          value={filterBy}
          onChange={handleFilterChange}
          className="border rounded py-2 px-4"
        >
          <option value="all">All</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>
      </div>
      {filteredEmails.map((email, index) => (
        <EmailCard
          key={index}
          sender={email.sender}
          subject={email.subject}
          content={email.text}
        />
      ))}
    </div>
  );
};

export default EmailList;
