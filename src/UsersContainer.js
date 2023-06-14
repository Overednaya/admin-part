import React, { useState } from 'react';
import UsersList from './UsersList';

function UsersContainer() {
  const [usersAmount, setUsersAmount] = useState(0);

  const handleUsersAmount = (users) => {
    setUsersAmount(users);
  };

  return (
    <div>
      {usersAmount > 1 ? (
        <h1>{usersAmount} users are here</h1>
      ) : usersAmount === 1 ? (
        <h1>{usersAmount} user is here</h1>
      ) : (
        <h1>Nobody is here</h1>
      )}
      <UsersList handleUsersAmount={handleUsersAmount} />
    </div>
  );
}

export default UsersContainer;
