import { commitMutation } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import environment from "../Environment";

const mutation = graphql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      username
      email
    }
  }
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default async (email, password, callback) => {
  const variables = {
    email,
    password,
  };

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response) => {
      const username = response.login.username;
      const token = response.login.token;
      const email = response.login.email;
      callback(username, token, email);
    },
    onError: (err) => console.error(err),
  });
};
