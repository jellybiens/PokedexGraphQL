import { ApolloProvider } from "react-apollo";

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';


const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
};

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem("token") ? `Bearer ${JSON.parse(localStorage.getItem("token")).token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  defaultOptions: defaultOptions,
  cache: new InMemoryCache()
});


module.exports = client;
