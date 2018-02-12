/**
 * @flow
 * @relayHash e7b86855a3dbb462dff9ebfecf4ac125
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
      +body: ?string;
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
      body
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
  ...BibleWidget_viewer
}

fragment NoteViewer_note on Note {
  id
  title
  body
  tags
  author {
    name
    id
  }
  verse {
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

fragment BibleWidget_viewer on Viewer {
  ...BibleVerse_viewer
  ...FocusedBibleVerse_viewer
  id
}

fragment BibleVerse_viewer on Viewer {
  id
  authenticated
}

fragment FocusedBibleVerse_viewer on Viewer {
  id
  ...NoteThumbnail_viewer
}

fragment NoteThumbnail_viewer on Viewer {
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
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "body",
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
                "name": "body",
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
                    "name": "verseNumber",
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
  "text": "query NotePageViewerQuery(\n  $token: String\n  $noteId: String!\n) {\n  viewer(token: $token) {\n    ...Navbar_viewer\n    ...NoteViewer_viewer\n    authenticated\n    note(id: $noteId) {\n      id\n      body\n      ...NoteViewer_note\n    }\n  }\n}\n\nfragment Navbar_viewer on Viewer {\n  authenticated\n  email\n  name\n}\n\nfragment NoteViewer_viewer on Viewer {\n  authenticated\n  ...BibleWidget_viewer\n}\n\nfragment NoteViewer_note on Note {\n  id\n  title\n  body\n  tags\n  author {\n    name\n    id\n  }\n  verse {\n    id\n    body\n    reference\n    url\n    notesCount\n    verseNumber\n    quote\n  }\n  output {\n    body\n    id\n  }\n}\n\nfragment BibleWidget_viewer on Viewer {\n  ...BibleVerse_viewer\n  ...FocusedBibleVerse_viewer\n  id\n}\n\nfragment BibleVerse_viewer on Viewer {\n  id\n  authenticated\n}\n\nfragment FocusedBibleVerse_viewer on Viewer {\n  id\n  ...NoteThumbnail_viewer\n}\n\nfragment NoteThumbnail_viewer on Viewer {\n  authenticated\n}\n"
};

module.exports = batch;
