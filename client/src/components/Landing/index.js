import React, { Component } from 'react';
import { GET_ALL_USERS } from '../Session/queries'
import withSession from '../Session/withSession';
import { MessageCreate, Messages } from '../Message';
import { client } from '../../'

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

// const AllUsers = () => (
//   <Query query={GET_ALL_USERS} >
//      {({data, loading, error, refetch}) => {
//       if(!data){
//         return <div>No users to be shown</div>
//       }
//       return(
//         <div>{data && data.users && data.users.map(user => 
//           <ul key={user.id} >
//             <li>UserId: {user.id}</li>
//             <li>Username: {user.username}</li>
//             <li>Email: {user.email}</li>
//           </ul>
//         )}
//         </div>
//       )
//     }}
//   </Query>
// )

const query = `
  query users{
    id,
    username,
    email,
    role,
    messages{
      text,
      createdAt
    }
  }
`

class AllUsers extends Component{

  componentDidMount = async () => {
    let result
    try {
      result = await client.query({query: GET_ALL_USERS})
    } catch (error) {
      // console.log('error: ' ,error);
    }
    console.log('result: ',result);
  }

  render() {
    const data = []

    return (
      <div>{data && data.users && data.users.map(user => 
        <ul key={user.id} >
          <li>UserId: {user.id}</li>
          <li>Username: {user.username}</li>
          <li>Email: {user.email}</li>
        </ul>
      )}
      </div>
    )
  }
}

export default withSession(Landing);
