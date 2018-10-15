import React, { Component } from 'react';
import { Query } from 'react-apollo'
import { GET_ALL_USERS } from '../Session/queries'
import withSession from '../Session/withSession';
import { MessageCreate, Messages } from '../Message';
import { client } from '../../'

const Landing = () => {
  // console.log('session: ',session)
  return(
    <div>
      <Page />
      <AllUsers />
    </div>
  )
};

// const AllUsers = () => (
//   <Query query={GET_ALL_USERS} >
//      {({data, loading, error, refetch}) => {
//       if(loading){
//         return(<div>Loading users....</div>)
//       }
//       if(!data || (data.users && data.users.length === 0)){
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

const _Page = ({session}) => (
  <div>
    <h2>Landing Page</h2>
      {session && session.me && <MessageCreate />}
      <Messages me={session.me} limit={2} />
  </div>
)

const Page = withSession(_Page)

class AllUsers extends Component{

  state = {
    users: []
  }

  componentDidMount = async () => {
    let result
    try {
      const { data: { users }} = await client.query({query: GET_ALL_USERS})
      this.setState({users})
    } catch (error) {
      // const { graphQLErrors: errors } = error
      // const msg = errors.map( item => item.message).join(', ')
      // console.log('msg: ' ,msg);
    }

  }

  render() {
    const { users } = this.state
  
    return (
      <div>{users && users.map(user => 
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

export default Landing