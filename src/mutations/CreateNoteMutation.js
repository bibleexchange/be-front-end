import {
  commitMutation,
  graphql,
} from 'react-relay'
import environment from '../createRelayEnvironment'
import {ConnectionHandler} from 'relay-runtime'

const mutation = graphql`
  mutation CreateNoteMutation($input: CreateNoteInput!) {
    createNote(input: $input) {
      noteEdge {
        typename
        cursor
        node {
          id
          title
          body
          verse{
            id
            reference
            body
          }
          tags_string
        }
      }

      viewer {
        id
      }

      error {
        code 
        message
      }

    }
  }
`;

let tempID = 0;

function sharedUpdater(store, viewer, newEdge) {
  const viewerProxy = store.get(viewer.id);
  const connection = ConnectionHandler.getConnection(
    viewerProxy,
    'MyNotes_userNotes',
  );

  if (connection) {
    ConnectionHandler.insertEdgeAfter(connection, newEdge);
  }

}

export default function CreateNoteMutation(note, viewer, callback) {
  const variables = {
    input: {
      title: note.title,
      body:note.body,
      reference: note.verse.reference,
      tags_string: note.tags_string,
      token:viewer.id,
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
        callback(response)
      },
      onError: err => console.error(err),
      
      optimisticResponse: {
        createNote: {
          noteEdge: {
            node: {
              body: "",
              tags_string: "#tags",
              title: note.title,
              verse: {reference:"John 1:1", body:"body"}
            }
          }
        },
      },

      optimisticUpdater: (store) => {

        const id = 'client:newNote:' + tempID++;
        const node = store.create(id, 'Note');
        
        node.setValue(id, 'id');
        node.setValue(note.body, 'body')
        node.setValue(note.title, 'title')
        node.setValue(note.tags_string, 'tags_string')

        const newEdge = store.create(
          'client:newEdge:' + tempID++,
          'NoteEdge',
        );

        newEdge.setLinkedRecord(node, 'node');
        sharedUpdater(store, viewer, newEdge);
        /*
        const userProxy = store.get(viewer.id);
       
        userProxy.setValue(
          userProxy.getValue('totalCount') + 1,
          'totalCount',
        );
        */
      },
      updater: (store) => {
        const payload = store.getRootField('createNote');
        const newEdge = payload.getLinkedRecord('noteEdge');
        sharedUpdater(store, viewer, newEdge);
      },
    },
  )
}