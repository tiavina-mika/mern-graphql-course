import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

export const LOGIN  = gql`
    mutation SetLogin($email: String!, $password: String) {
        login (email: $email, password: $password) {
            token
            isAdmin
            user { email, username }
        }
    }
`;

export default onError => {
    let [mutate, { loading, data, error }] = useMutation(LOGIN, { onError });

    return [({ email, password }) => {
        return mutate({variables: { email, password }});
    }, 
    { loading, data, error } ];
};