import React from 'react';
import { useSession, getSession, signOut } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

type Props = {};

const HomePage = (props: Props) => {
  const { data: session, status } = useSession();

  return session?.user.role === 'user' ? <UserDashboard /> : <AdminDashboard />;
};

export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: '/api/auth/signin',
        permament: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default HomePage;
