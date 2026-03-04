'use client';

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

export const ApolloClientProvider = ({ children }) => {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: "https://hr-helper.onrender.com/graphql",
    }),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};