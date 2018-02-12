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

function sharedUpdater(store, token, newEdge) {
  const viewerProxy = store.get(token);
  const connection = ConnectionHandler.getConnection(
    viewerProxy,
    'MyNotesComponent_userNotes',
  );

  if (connection) {
    ConnectionHandler.insertEdgeAfter(connection, newEdge);
  }

}

export default function CreateNoteMutation(note, token, success, error) {
  const variables = {
    input: {
      title: note.title? note.title:undefined,
      body:note.body? note.body:"",
      reference: note.verse? note.verse.reference:undefined,
      tags_string: note.tags_string? note.tags_string:undefined,
      token:token,
      clientMutationId: ""     
    },
  }

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response) => {
        success(response)
      },
      onError: (err) => {
        console.log("error", err)
        error(err)
      },
      
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
        sharedUpdater(store, token, newEdge);
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
        sharedUpdater(store, token, newEdge);
      },
    },
  )
}