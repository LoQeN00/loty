import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useQuery, gql } from '@apollo/client';

type Props = {};

const MATERIALS_QUERY = gql`
  query ($id: ID) {
    nextUser(where: { id: $id }) {
      materials {
        file {
          fileName
          url
          mimeType
        }
      }
    }
  }
`;

const UserDashboard = (props: Props) => {
  const { data: session, status } = useSession();

  const { data, loading, error } = useQuery(MATERIALS_QUERY, {
    variables: {
      id: session?.user.userId,
    },
  });

  const downloadFile = () => {};

  console.log(data);

  return (
    <div>
      <h1>Witaj userze</h1>
      <button onClick={() => signOut()}>Wyloguj się</button>
      {data && (
        <div>
          <h1>Twoje materiały do pobrania</h1>
          {data?.nextUser?.materials.map((material: any, index: any) => {
            console.log(material.file[0]);
            return (
              <div key={material.id}>
                <a href={material.file[0].url} download="kurs" rel="noreferrer" target="_blank">
                  {material.file[0].fileName}
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
