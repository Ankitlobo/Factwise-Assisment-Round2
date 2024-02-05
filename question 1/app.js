import React from 'react';
import ListUsers from './ListUsers'; // Assuming the component is in a file named ListUsers.js

const App = () => {
  const usersData = [
    { firstName: 'Ada', lastName: 'Lovelace' },
    { firstName: 'Donald', lastName: 'Knuth' },
  ];

  return (
    <div>
      <ListUsers users={usersData} />
    </div>
  );
};

export default App;
