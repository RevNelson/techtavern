import { gql } from "@apollo/client";

import {
  NAME_RETURN_FRAGMENT,
  ADDRESS_RETURN_FRAGMENT,
  CART_RETURN_FRAGMENT,
  USER_RETURN_FRAGMENT,
} from "./fragments";

export const ALL_PRODUCTS_QUERY = gql`
  query allProducts($category: String) {
    products(where: { categories: $category }) {
      name
      sku
      tb_final_price
    }
  }
`;

export const PRODUCT_CATEGORY_QUERY = gql`
  query allProducts($categories: String) {
    products(where: { categories: { parent: { name: $categories } } }) {
      name
      sku
      price
      sale_price
      final_price
    }
  }
`;

export const USER_INFO = gql`
  query userInfo {
    self {
      ...userAllFields
    }
  }
  ${USER_RETURN_FRAGMENT}
`;
