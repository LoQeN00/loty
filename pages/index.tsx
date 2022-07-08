import React from 'react';
import { useSession, getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';

type Props = {};

const HomePage = (props: Props) => {
  const { data: session, status } = useSession();

  return (
    <div>
      <h1 className="text-2xl text-red-500">HomePage</h1>
    </div>
  );
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
