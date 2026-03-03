import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const getClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "https://hr-helper.onrender.com/graphql", 
    }),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache', // Щоб завжди отримувати свіжі дані
      },
    },
  });
};