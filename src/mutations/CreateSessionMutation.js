import {
  commitMutation,
  graphql,
} from 'react-relay'
import environment from '../createRelayEnvironment'
//import {ConnectionHandler} from 'relay-runtime'

const mutation = graphql`
  mutation CreateSessionMutation($input: CreateSessionInput!) {
    createSession(input: $input) {
      error {
       code
       message
      }
      clientMutationId
      viewer {
        id
        authenticated
        name
        email
      }
    }
  }
`;

export default function CreateSessionMutation(email, password, callback) {
  const variables = {
    input: {
      email,
      password,
      clientMutationId: "0"
    },
  }
  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response) => {
        console.log(response, environment)
        callback(response)
      },
      onError: err => console.error(err)
    },
  )
}
