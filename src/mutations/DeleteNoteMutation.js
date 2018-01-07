import {
  commitMutation,
  graphql,
} from 'react-relay'
import {ConnectionHandler} from 'relay-runtime'
import environment from '../createRelayEnvironment'

const mutation = graphql`
  mutation DeleteNoteMutation($input: DeleteNoteInput!) {
    deleteNote(input: $input) {
      deletedId
    }
  }
`;

export default function DeleteNoteMutation(noteId, viewer, callback) {
  const variables = {
    input: {
      id: noteId,
      clientMutationId: ""
    },
  }
  commitMutation(
    environment,
    {
      mutation,
      variables,
      onError: err => console.error(err),
      onCompleted: (response) => {
        callback(response)
      },
      updater: (proxyStore) => {
        const deletePostField = proxyStore.getRootField('deleteNote')
        const deletedId = deletePostField.getValue('deletedId')
        const viewerProxy = proxyStore.get(viewer.id)
        const connection = ConnectionHandler.getConnection(viewerProxy, 'MyNotes_userNotes')
        console.log(ConnectionHandler)
        ConnectionHandler.deleteNode(connection, deletedId)
      }
    },
  )
}

/*


*/