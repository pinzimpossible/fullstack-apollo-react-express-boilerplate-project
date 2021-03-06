import 'dotenv/config';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './components/App';
import { signOut } from './components/SignOut';
// import registerServiceWorker from './registerServiceWorker';

const port = process.env.REACT_APP_SERVER_PORT || 5000;
const host = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_HOST_NAME : 'localhost'

const httpLink = new HttpLink({
  uri: `/graphql`
});

const wsLink = new WebSocketLink({
  uri: `ws://${host}:${port}/graphql`,
  options: {
    reconnect: true,
  },
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {}, localToken = localStorage.getItem('token') }) => {
    if (localToken) {
      headers['x-token'] = localToken;
    }
    return {
      headers
    }
  });
  
  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, statusCode, locations, path }) => {
      console.log('message: ', message);
      // console.log('statusCode: ', statusCode);
      if (statusCode === 401) {
        signOut(client);
      }
    });
  }

  if (networkError) {
    console.log('Network error: ', networkError);
    
    if (networkError.statusCode === 401) {
      signOut(client);
    }
  }
});

const link = ApolloLink.from([authLink, errorLink, terminatingLink]);

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

// registerServiceWorker();
