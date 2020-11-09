import { gql } from "@apollo/client";

import {
  NAME_RETURN_FRAGMENT,
  ADDRESS_RETURN_FRAGMENT,
  CART_RETURN_FRAGMENT,
  USER_RETURN_FRAGMENT,
} from "./fragments";

export const USER_LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    login(input: { identifier: $email, password: $password }) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export const USER_REGISTER = gql`
  mutation userRegistration(
    $name: NameInput
    $address: AddressInput
    $carts: CartInput
    $user: UserInput!
  ) {
    registration(
      input: { name: $name, address: $address, carts: $carts, user: $user }
    ) {
      jwt
      user {
        ...userAllFields
      }
    }
  }
  ${USER_RETURN_FRAGMENT}
`;

export const USER_UPDATE = gql`
  mutation userUpdate(
    $id: ID!
    $username: String
    $name: ID
    $addresses: [ID]
    $carts: [ID]
    $phone: String
    $orders: [ID]
  ) {
    updateUser(
      input: {
        where: { id: $id }
        data: {
          username: $username
          name: $name
          addresses: $addresses
          carts: $carts
          phone: $phone
          orders: $orders
        }
      }
    ) {
      user {
        ...UserAllFields
      }
    }
  }
  ${USER_RETURN_FRAGMENT}
`;

export const CREATE_NAME = gql`
  mutation create_name(
    $title: String
    $first: String
    $middle: String
    $last: String
    $suffix: String
  ) {
    createName(
      input: {
        data: {
          title: $title
          first: $first
          middle: $middle
          last: $last
          suffix: $suffix
        }
      }
    ) {
      ...NameAllFields
    }
  }
  ${NAME_RETURN_FRAGMENT}
`;
