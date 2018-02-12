import {
  commitMutation,
  graphql,
} from 'react-relay'
import environment from '../createRelayEnvironment'

const mutation = graphql`
  mutation UpdateNoteMutation($input: UpdateNoteInput!) {
    updateNote(input: $input) {
      error {
        message
        code
      }
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

export default function UpdateNoteMutation(note, token, callback) {
  const variables = {
    input: {
      id: note.id? note.id:undefined,
      title: note.title? note.title:undefined,
      body:note.body? note.body:undefined,
      reference: note.verse? note.verse.reference: undefined,
      tags_string: note.tags_string? note.tags_string:undefined,
      token:token? token:undefined,
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
