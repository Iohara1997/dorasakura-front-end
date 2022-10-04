import graphql from "babel-plugin-relay/macro";

export const RegisterUser = graphql`
  mutation RegisterUserMutation(
    $username: String!
    $email: String!
    $password: String!
  ) {
    registerUser(username: $username, email: $email, password: $password) {
      token
      username
      email
    }
  }
`;
