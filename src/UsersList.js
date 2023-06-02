import React, { useEffect, useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import InputBase from '@mui/material/InputBase';

function UsersList({ handleUsersAmount }) {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setSortedUsers([...users]);
  }, [users]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const data = await response.json();
      setUsers(data);
      handleUsersAmount(data.length);
    } catch (error) {
      console.log('Error of downloading', error);
    }
  };

  const handleDelete = ({ id }) => {
    const userIndex = users.findIndex((user) => user.id === id);
    const updatedUsers = [...users];
    updatedUsers.splice(userIndex, 1);
    setUsers(updatedUsers);
    handleUsersAmount(updatedUsers.length);
  };

  const handleSortBy = (option) => {
    setSortOption(option);
    let sorted;
    switch (option) {
      case 'name':
        sorted = [...users].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'username':
        sorted = [...users].sort((a, b) =>
          a.username.localeCompare(b.username)
        );
        break;
      case 'id':
        sorted = [...users].sort((a, b) => a.id - b.id);
        break;
      default:
        sorted = [...users];
        break;
    }
    setSortedUsers(sorted);
  };

  const handleFilterByName = (event) => {
    const value = event.target.value;
    setNameFilter(value);
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setSortedUsers(filteredUsers);
  };

  return (
    <div>
      <div className='container'>
        <Select
          value={sortOption}
          label='Sort'
          onChange={(e) => handleSortBy(e.target.value)}
        >
          <MenuItem value='name'>Sort users by name</MenuItem>
          <MenuItem value='username'>Sort users by username</MenuItem>
          <MenuItem value='id'>Sort users by ID</MenuItem>
        </Select>
        <InputBase
          type='text'
          value={nameFilter}
          onChange={handleFilterByName}
          placeholder='Filter by name'
        />{' '}
      </div>
      <ul className='users-list'>
        {sortedUsers.length > 0 ? (
          sortedUsers.map((user) => (
            <li key={user.id} className='user-item'>
              <div className='item-details'> ID : {user.id}</div>
              <div className='item-details'>Name: {user.name}</div>
              <div className='item-details'> Username: {user.username}</div>
              <div className='item-details'>Email: {user.email}</div>
              <div className='item-details'>
                Adress: {user.address.street}, {user.address.suite}
              </div>
              <div className='item-details'>
                City: {user.address.city}, {user.address.zipcode}
              </div>
              <IconButton
                aria-label='delete'
                onClick={() => handleDelete(user)}
              >
                <DeleteIcon />
              </IconButton>
            </li>
          ))
        ) : (
          <li>No users found.</li>
        )}
      </ul>
    </div>
  );
}

export default UsersList;
