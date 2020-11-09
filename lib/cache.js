import { InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    // Type policy map
    Product: {
      fields: {
        // Field policy map for the Product type
        isInCart: {
          // merge(existing, incoming, { mergeObjects }) {
          //   console.log("INCOMING:", incoming);
          //   return mergeObjects(existing, incoming);
          // },
          // Field policy for the isInCart field
          read(_, { readField }) {
            // console.log(readField("sku"));
            // The read function for the isInCart field
            return localStorage
              .getItem("CART_ITEMS")
              .includes(readField("sku"));
          },
        },
      },
    },
  },
});
