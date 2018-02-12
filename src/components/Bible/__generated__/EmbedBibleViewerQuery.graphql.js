/**
 * @flow
 * @relayHash 0240b519000a870517d57de423c665e7
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type EmbedBibleViewerQueryResponse = {|
  +viewer: ?{|
    +authenticated: ?boolean;
    +bibleVerses: ?{| |};
  |};
|};
*/


/*
query EmbedBibleViewerQuery(
  $token: String
  $reference: String
) {
  viewer(token: $token) {
    ...BibleWidget_viewer
    authenticated
    bibleVerses(id: $reference) {
      ...BibleWidget_verses
    }
  }
}

fragment BibleWidget_viewer on Viewer {
  ...BibleVerse_viewer
  ...FocusedBibleVerse_viewer
  id
}

fragment BibleWidget_verses on BibleVerseConnection {
  pageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
  info {
    nextChapterURL
    previousChapterURL
  }
  edges {
    cursor
    node {
      ...BibleVerse_verse
      id
      body
      reference
      verseNumber
      crossReferences(first: $crossReferencesPageSize) {
        edges {
          node {
            id
            reference
          }
        }
      }
      chapter {
        id
        order_by
      }
      book {
        id
        title
      }
    }
  }
}

fragment BibleVerse_verse on BibleVerse {
  id
  body
  verseNumber
  reference
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
        "name": "reference",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "EmbedBibleViewerQuery",
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
            "name": "BibleWidget_viewer",
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
                "variableName": "reference",
                "type": "String"
              }
            ],
            "concreteType": "BibleVerseConnection",
            "name": "bibleVerses",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "BibleWidget_verses",
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
  "name": "EmbedBibleViewerQuery",
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
        "name": "reference",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "EmbedBibleViewerQuery",
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
            "name": "id",
            "storageKey": null
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
                "variableName": "reference",
                "type": "String"
              }
            ],
            "concreteType": "BibleVerseConnection",
            "name": "bibleVerses",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "hasPreviousPage",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "startCursor",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "endCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "ResultInfo",
                "name": "info",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "nextChapterURL",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "previousChapterURL",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "BibleVerseEdge",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "cursor",
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "BibleVerse",
                    "name": "node",
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
                        "kind": "LinkedField",
                        "alias": null,
                        "args": [
                          {
                            "kind": "Variable",
                            "name": "first",
                            "variableName": "crossReferencesPageSize",
                            "type": "Int"
                          }
                        ],
                        "concreteType": "CrossReferenceConnection",
                        "name": "crossReferences",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "args": null,
                            "concreteType": "CrossReferenceEdge",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "args": null,
                                "concreteType": "CrossReference",
                                "name": "node",
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
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "SimpleBibleChapter",
                        "name": "chapter",
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
                            "name": "order_by",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "BibleBook",
                        "name": "book",
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
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query EmbedBibleViewerQuery(\n  $token: String\n  $reference: String\n) {\n  viewer(token: $token) {\n    ...BibleWidget_viewer\n    authenticated\n    bibleVerses(id: $reference) {\n      ...BibleWidget_verses\n    }\n  }\n}\n\nfragment BibleWidget_viewer on Viewer {\n  ...BibleVerse_viewer\n  ...FocusedBibleVerse_viewer\n  id\n}\n\nfragment BibleWidget_verses on BibleVerseConnection {\n  pageInfo {\n    hasNextPage\n    hasPreviousPage\n    startCursor\n    endCursor\n  }\n  info {\n    nextChapterURL\n    previousChapterURL\n  }\n  edges {\n    cursor\n    node {\n      ...BibleVerse_verse\n      id\n      body\n      reference\n      verseNumber\n      crossReferences(first: $crossReferencesPageSize) {\n        edges {\n          node {\n            id\n            reference\n          }\n        }\n      }\n      chapter {\n        id\n        order_by\n      }\n      book {\n        id\n        title\n      }\n    }\n  }\n}\n\nfragment BibleVerse_verse on BibleVerse {\n  id\n  body\n  verseNumber\n  reference\n}\n\nfragment BibleVerse_viewer on Viewer {\n  id\n  authenticated\n}\n\nfragment FocusedBibleVerse_viewer on Viewer {\n  id\n  ...NoteThumbnail_viewer\n}\n\nfragment NoteThumbnail_viewer on Viewer {\n  authenticated\n}\n"
};

module.exports = batch;
