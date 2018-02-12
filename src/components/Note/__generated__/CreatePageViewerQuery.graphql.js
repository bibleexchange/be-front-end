/**
 * @flow
 * @relayHash 8711c92ed01352de3536fc8812d38861
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type CreatePageViewerQueryResponse = {|
  +viewer: ?{|
    +id: ?string;
    +bibleVerse: ?{|
      +id: string;
      +reference: ?string;
      +body: ?string;
    |};
  |};
|};
*/


/*
query CreatePageViewerQuery(
  $verseID: String!
) {
  viewer {
    ...NoteCreator_viewer
    id
    bibleVerse(id: $verseID) {
      ...NoteCreator_bibleVerse
      id
      reference
      body
    }
  }
}

fragment NoteCreator_viewer on Viewer {
  authenticated
}

fragment NoteCreator_bibleVerse on BibleVerse {
  id
  reference
  body
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "verseID",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreatePageViewerQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "NoteCreator_viewer",
            "args": null
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
                "variableName": "verseID",
                "type": "String"
              }
            ],
            "concreteType": "BibleVerse",
            "name": "bibleVerse",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "NoteCreator_bibleVerse",
                "args": null
              },
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
                "name": "reference",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "body",
                "storageKey": null
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
  "name": "CreatePageViewerQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "verseID",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "CreatePageViewerQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
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
                "variableName": "verseID",
                "type": "String"
              }
            ],
            "concreteType": "BibleVerse",
            "name": "bibleVerse",
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
                "name": "reference",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "body",
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
  "text": "query CreatePageViewerQuery(\n  $verseID: String!\n) {\n  viewer {\n    ...NoteCreator_viewer\n    id\n    bibleVerse(id: $verseID) {\n      ...NoteCreator_bibleVerse\n      id\n      reference\n      body\n    }\n  }\n}\n\nfragment NoteCreator_viewer on Viewer {\n  authenticated\n}\n\nfragment NoteCreator_bibleVerse on BibleVerse {\n  id\n  reference\n  body\n}\n"
};

module.exports = batch;
