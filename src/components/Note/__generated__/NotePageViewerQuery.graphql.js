/**
 * @flow
 * @relayHash 78efa6ad5f8f1646383cd2186a98b530
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type NotePageViewerQueryResponse = {|
  +viewer: ?{|
    +authenticated: ?boolean;
    +note: ?{|
      +id: string;
    |};
  |};
|};
*/


/*
query NotePageViewerQuery(
  $token: String
  $noteId: String!
) {
  viewer(token: $token) {
    ...Navbar_viewer
    ...NoteViewer_viewer
    authenticated
    note(id: $noteId) {
      id
      ...NoteViewer_note
    }
  }
}

fragment Navbar_viewer on Viewer {
  authenticated
  email
  name
}

fragment NoteViewer_viewer on Viewer {
  authenticated
  ...SimpleBibleVerse_viewer
}

fragment NoteViewer_note on Note {
  id
  title
  tags
  author {
    name
    id
  }
  verse {
    ...SimpleBibleVerse_verse
    id
    body
    reference
    url
    notesCount
    verseNumber
    quote
  }
  output {
    body
    id
  }
}

fragment SimpleBibleVerse_verse on SimpleBibleVerse {
  id
  body
  verseNumber
  reference
}

fragment SimpleBibleVerse_viewer on Viewer {
  id
  authenticated
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "token",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "noteId",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "NotePageViewerQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "token",
            "variableName": "token",
            "type": "String"
          }
        ],
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Navbar_viewer",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "NoteViewer_viewer",
            "args": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "authenticated",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "noteId",
                "type": "String"
              }
            ],
            "concreteType": "Note",
            "name": "note",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "FragmentSpread",
                "name": "NoteViewer_note",
                "args": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "ViewerQuery"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "NotePageViewerQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "token",
        "type": "String",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "noteId",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "NotePageViewerQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "token",
            "variableName": "token",
            "type": "String"
          }
        ],
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "authenticated",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "email",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "name",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "noteId",
                "type": "String"
              }
            ],
            "concreteType": "Note",
            "name": "note",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "title",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "tags",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Owner",
                "name": "author",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "SimpleBibleVerse",
                "name": "verse",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "body",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "verseNumber",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "reference",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "url",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "notesCount",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "quote",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "NoteCache",
                "name": "output",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "body",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query NotePageViewerQuery(\n  $token: String\n  $noteId: String!\n) {\n  viewer(token: $token) {\n    ...Navbar_viewer\n    ...NoteViewer_viewer\n    authenticated\n    note(id: $noteId) {\n      id\n      ...NoteViewer_note\n    }\n  }\n}\n\nfragment Navbar_viewer on Viewer {\n  authenticated\n  email\n  name\n}\n\nfragment NoteViewer_viewer on Viewer {\n  authenticated\n  ...SimpleBibleVerse_viewer\n}\n\nfragment NoteViewer_note on Note {\n  id\n  title\n  tags\n  author {\n    name\n    id\n  }\n  verse {\n    ...SimpleBibleVerse_verse\n    id\n    body\n    reference\n    url\n    notesCount\n    verseNumber\n    quote\n  }\n  output {\n    body\n    id\n  }\n}\n\nfragment SimpleBibleVerse_verse on SimpleBibleVerse {\n  id\n  body\n  verseNumber\n  reference\n}\n\nfragment SimpleBibleVerse_viewer on Viewer {\n  id\n  authenticated\n}\n"
};

module.exports = batch;
