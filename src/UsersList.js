import React, { useEffect, useState } from 'react';

function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {
        setSortedUsers([...users]);
      }, [users]);

    const fetchUsers =  async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log('Error of downloadind', error)
        };
    }

    const handleDelete = ({id}) => {
        const userIndex = users.findIndex(user => user.id === id);
        const updatedUsers = [...users];
        updatedUsers.splice(userIndex, 1)
        setUsers(updatedUsers)
    }

    const [sortedUsers, setSortedUsers] = useState([])


    const handleSortByName = () => {
        const sorted = [...users].sort((a, b) => a.name.localeCompare(b.name))
        setSortedUsers(sorted)
    }

    const handleSortByUsername = () => {
        const sorted = [...users].sort((a, b) => a.username.localeCompare(b.username));
        setSortedUsers(sorted)
    }

    const handleSortById = () => {
        const sorted = [...users].sort((a, b) => a.id - b.id);
        setSortedUsers(sorted);
    }

    return (
        <div>
        <h1>Users List</h1>
        <button className='button' onClick={handleSortByName}>
          Sort users by name
        </button>
        <button className='button' onClick={handleSortByUsername}>
          Sort users by username
        </button>
        <button className='button' onClick={handleSortById}>
          Sort users by ID
        </button>
        <ul className='users-list'>
          {sortedUsers.length > 0
            ? sortedUsers.map((user) => (
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
                  <button className='button' onClick={() => handleDelete(user)}>
                    Delete user
                  </button>
                </li>
              ))
            : users.map((user) => (
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
                  <button className='button' onClick={() => handleDelete(user)}>
                    Delete user
                  </button>
                </li>
              ))}
        </ul>
      </div>
    );
};

export default UsersList;