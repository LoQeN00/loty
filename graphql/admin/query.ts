import { gql } from '@apollo/client';

export const STUDENTS_QUERY = gql`
  query ($id: ID) {
    nextUser(where: { id: $id }) {
      students {
        id
        email
      }
    }
  }
`;
