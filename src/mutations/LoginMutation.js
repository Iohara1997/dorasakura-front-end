import graphql from "babel-plugin-relay/macro";

export const LoginRequest = graphql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      username
      email
    }
  }
`;
