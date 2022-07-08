import React from 'react';
import { signOut } from 'next-auth/react';
type Props = {};

const UserDashboard = (props: Props) => {
  return (
    <div>
      <h1>Witaj userze</h1>
      <button onClick={() => signOut()}>Wyloguj się</button>
    </div>
  );
};

export default UserDashboard;
