import React from 'react';
import { signOut } from 'next-auth/react';
type Props = {};

const AdminDashboard = (props: Props) => {
  return (
    <div>
      <h1>Witaj adminie</h1>
      <button onClick={() => signOut()}>Wyloguj się</button>
    </div>
  );
};

export default AdminDashboard;
