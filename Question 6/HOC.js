import React, { useState, useEffect } from 'react';

// Higher-Order Component (HOC) to handle loading state
const withLoadingSpinner = (WrappedComponent, condition) => {
  return function WithLoadingSpinner(props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          const data = await response.json();
          props.setUsers(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      if (condition) {
        fetchData();
      }
    }, [condition, props]);

    return loading ? <div>Loading...</div> : <WrappedComponent {...props} />;
  };
};

// UserList component (provided component)
const UserList = ({ users }) => (
  <div>
    <h2>User List:</h2>
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  </div>
);

// Wrapped UserList component with loading spinner HOC
const UserListWithLoading = withLoadingSpinner(UserList, true);

// Example usage of the wrapped component
const App = () => {
  const [users, setUsers] = useState([]);

  return (
    <div>
      <UserListWithLoading users={users} setUsers={setUsers} />
    </div>
  );
};

export default App;
