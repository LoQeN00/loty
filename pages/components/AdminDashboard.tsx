import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useQuery } from '@apollo/client';
import { STUDENTS_QUERY } from '../../graphql/admin/query';
import Student from '../components/Student';
type Props = {};

const AdminDashboard = (props: Props) => {
  const { data: session, status } = useSession();

  const { data, loading, error } = useQuery(STUDENTS_QUERY, {
    variables: {
      id: session?.user.userId,
    },
  });
  return (
    <div>
      <h1>Witaj adminie</h1>
      <button onClick={() => signOut()}>Wyloguj się</button>
      {data && data?.nextUser?.students.map((user: any) => <Student key={user.id} {...user} />)}
    </div>
  );
};

export default AdminDashboard;
