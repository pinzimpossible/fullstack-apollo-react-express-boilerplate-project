import React from 'react';
import { Query } from 'react-apollo';
import { GET_ME } from './queries';

const withSession = Component => props => (
  <Query query={GET_ME}>
    {({ data, loading, refetch }) => (
      <Component {...props} session={data} loading={loading} refetch={refetch} />
    )}
  </Query>
);

export default withSession;
