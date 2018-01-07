import {
  commitMutation,
  graphql,
} from 'react-relay'
import environment from '../createRelayEnvironment'
//import {ConnectionHandler} from 'relay-runtime'

const mutation = graphql`
  mutation UpdateNoteMutation($input: UpdateNoteInput!) {
    updateNote(input: $input) {
      note {
        id
        verse {
          id
          reference
        }
        title
        body
        tags_string
      }
    }
  }
`;

let tempID = 0;

export default function UpdateNoteMutation(note, viewer, callback) {
  const variables = {
    input: {
      id: note.id,
      title: note.title,
      body:note.body,
      reference: note.verse.reference,
      tags_string: note.tags_string,
      token:viewer.id,
      clientMutationId: tempID
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
      onError: err => console.error(err),
      optimisticUpdater: (proxyStore) => {
       //
      },
      updater: (proxyStore) => {
        //
      },
    },
  )
}
