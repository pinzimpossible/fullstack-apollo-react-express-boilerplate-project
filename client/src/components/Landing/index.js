import React from 'react';
import { Query } from 'react-apollo'
import { GET_ALL_USERS } from '../Session/queries'

import withSession from '../Session/withSession';

import { MessageCreate, Messages } from '../Message';

const Landing = ({ session }) => {
  // console.log('session: ',session)
  return(
    <div>
      <h2>Landing Page</h2>
      {session && session.me && <MessageCreate />}
      <Messages me={session.me} limit={2} />
      <AllUsers />
    </div>
  )
};

const AllUsers = () => (
  <Query query={GET_ALL_USERS} >
     {({data, loading, error, refetch}) => {
      if(!data){
        return <div>No users to be shown</div>
      }
      return(
        <div>{data && data.users && data.users.map(user => 
          <ul key={user.id} >
            <li>UserId: {user.id}</li>
            <li>Username: {user.username}</li>
            <li>Email: {user.email}</li>
          </ul>
        )}
        </div>
      )
    }}
  </Query>
)

export default withSession(Landing);
