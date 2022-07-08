import { gql } from '@apollo/client';

export const CREATE_MATERIAL_MUTATION = gql`
  mutation ($fileId: ID) {
    createMaterial(data: { name: "es", file: { connect: { id: $fileId } } }) {
      id
    }
  }
`;

export const LINK_MATERIAL_TO_USER = gql`
  mutation ($nextUserId: ID, $fileId: ID) {
    updateNextUser(where: { id: $nextUserId }, data: { materials: { connect: { where: { id: $fileId } } } }) {
      id
    }
  }
`;

export const PUBLISH_USER = gql`
  mutation ($id: ID) {
    publishNextUser(to: PUBLISHED, where: { id: $id }) {
      id
    }
  }
`;
