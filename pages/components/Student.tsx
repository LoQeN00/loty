import React, { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import { addAsset } from '../../lib/addAsset';
import { CREATE_MATERIAL_MUTATION, LINK_MATERIAL_TO_USER, PUBLISH_USER } from '../../graphql/admin/mutation';

type Props = {
  email: string;
  id: string;
};

const Student = ({ email, id }: Props) => {
  const [files, setFiles] = useState<File[] | []>([]);

  const { data: session, status } = useSession();

  const [addMaterial] = useMutation(CREATE_MATERIAL_MUTATION);
  const [linkMaterial] = useMutation(LINK_MATERIAL_TO_USER);
  const [publishUser] = useMutation(PUBLISH_USER);

  const filePickerRef = useRef<HTMLInputElement | null>(null);

  const showFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles((prevState) => [...prevState!, e.target.files![0]]);
  };

  const addMaterials = async () => {
    files.forEach(async (file) => {
      const response = await addAsset(file);
      const material = await addMaterial({ variables: { fileId: response.id } });
      console.log(material);
      if (!material) return;
      //@ts-ignore
      const linkToUser = await linkMaterial({ variables: { nextUserId: id, fileId: material.data.createMaterial.id } });
      const publish = await publishUser({ variables: { id } });

      console.log(publish);
    });

    setFiles([]);
  };

  return (
    <div>
      <h1>
        {email}{' '}
        <span>
          <button onClick={() => filePickerRef.current?.click()}>Dodaj</button>
          <input onChange={showFiles} type="file" hidden ref={filePickerRef} />
        </span>{' '}
        {files.length > 0 && (
          <>
            {files.map((file, index) => {
              return <div key={index}>{file.name}</div>;
            })}
            <button className="px-4 py-2 border-2 border-teal-500" onClick={addMaterials}>
              Dodaj materiały dla uzytkownika
            </button>
          </>
        )}
      </h1>
    </div>
  );
};

export default Student;
