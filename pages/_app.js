import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { CacheProvider } from "@emotion/react";
import { cache } from "@emotion/css";

import "antd/dist/antd.css";
import "../styles/vars.css";
import "../styles/global.css";
import { globalStyles } from "../shared/styles";

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <CacheProvider value={cache}>
        {globalStyles}
        <Component {...pageProps} />
      </CacheProvider>
    </ApolloProvider>
  );
}
