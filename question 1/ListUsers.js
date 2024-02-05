import React from 'react';

const ListUsers = ({ users }) => {
  // Sort users alphabetically by last name (case insensitive)
  const sortedUsers = users ? users.sort((a, b) => a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase())) : [];

  return (
    <div>
      <div className="user-count">Users: {sortedUsers.length}</div>
      {sortedUsers.length > 0 && (
        <ul className="user-list">
          {sortedUsers.map((user, index) => (
            <li key={index}>{`${user.firstName} ${user.lastName}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListUsers;
