import React, { useState } from 'react';
import Button from '@mui/material/Button';

function SavedUsersList({ savedUsers }) {

    const [showSavedUsers, setShowSavedUsers] = useState(false)

    const handleClick = () => {
        setShowSavedUsers(!showSavedUsers)
        console.log(savedUsers)
    }
    return (
        <div>
            <Button onClick={handleClick}>
            {showSavedUsers ? 'Hide saved Users' : 'Show Saved Users'}</Button>
            {showSavedUsers && (
                <ul className='users-list'>
                    {savedUsers.map((user) => <li key={user.id} className='user-item'>
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
            </li>)}
                </ul>
            )}
        </div>
    )
}

export default SavedUsersList;