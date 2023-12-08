import React from 'react';
import { getUserId } from "../utils/auth";

const ProfilePage = ({ user }) => {
  if (user.id === getUserId()) {
    return (
      <div>
        <h1>Profile Page:</h1>
        <h1>{user.id}</h1>
        <h2>{user.name}</h2>
        <h2>{user.email}</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Unauthorized</h1>
      </div>
    );
  }
};

export default ProfilePage;
