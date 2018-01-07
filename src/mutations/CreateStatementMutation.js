import {
  commitMutation,
  graphql,
} from 'react-relay'
import environment from '../createRelayEnvironment'
//import {ConnectionHandler} from 'relay-runtime'

const mutation = graphql`
  mutation CreateStatementMutation($input: CreateStatementInput!) {
    createStatement(input: $input) {
      error
      code
      clientMutationId
      track {
         id
          activity {
            id
            body
            order_by
            lesson {
              id
              title
              order_by
            }
          }
        
      }
    }
  }
`;

//let tempID = 0;

export default function CreateStatementMutation(track_id, activity_id, verb, token, callback ) {
  const variables = {
    input: {
      track_id,
      activity_id,
      verb,
      token,
      clientMutationId: ""
    },
  }
  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response) => {
        console.log(response, environment)
        callback()
      },
      onError: err => console.error(err),
      updater: (proxyStore) => {
        console.log(proxyStore)
        // 1 - retrieve the `track` from the server response
        //const createPostField = proxyStore.getRootField('createStatement')
        //const track = createPostField.getLinkedRecord('track')
      },
    },
  )
}
