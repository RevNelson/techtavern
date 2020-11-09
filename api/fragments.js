import { gql } from "@apollo/client";

export const NAME_RETURN_FRAGMENT = gql`
  fragment nameAllFields on Name {
    id
    created_at
    updated_at
    title
    first
    middle
    last
    suffix
  }
`;

export const ADDRESS_RETURN_FRAGMENT = gql`
  fragment addressAllFields on Address {
    id
    created_at
    updated_at
    label
    name
    phone
    line1
    line2
    city
    state
    zip
    country
  }
`;

export const CART_RETURN_FRAGMENT = gql`
  fragment cartAllFields on Cart {
    id
    created_at
    updated_at
    discount
    promo
    tax
    shipping
  }
`;

export const USER_RETURN_FRAGMENT = gql`
  fragment userAllFields on UsersPermissionsUser {
    id
    created_at
    updated_at
    username
    email
    name {
      ...nameAllFields
    }
    phone
    addresses {
      ...addressAllFields
    }
    carts {
      ...cartAllFields
    }
  }
  ${NAME_RETURN_FRAGMENT}
  ${ADDRESS_RETURN_FRAGMENT}
  ${CART_RETURN_FRAGMENT}
`;
