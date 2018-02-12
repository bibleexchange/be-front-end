/**
 * @flow
 * @relayHash ebb231376c56a0d998cf4802ca840b1a
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ScriptureViewerQueryResponse = {|
  +viewer: ?{|
    +bibleVerses: ?{| |};
    +bibleVerse: ?{| |};
  |};
|};
*/


/*
query ScriptureViewerQuery(
  $token: String
  $reference: String
  $crossReferencesPageSize: Int!
  $notesPageSize: Int!
) {
  viewer(token: $token) {
    ...BibleWidget_viewer
    bibleVerses(id: $reference) {
      ...BibleWidget_verses
    }
    bibleVerse(id: $reference) {
      ...BibleWidget_bibleVerse
      id
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

fragment BibleWidget_bibleVerse on BibleVerse {
  ...FocusedBibleVerse_verse
  previous {
    reference
    id
  }
  next {
    reference
    id
  }
}

fragment FocusedBibleVerse_verse on BibleVerse {
  id
  reference
  body
  verseNumber
  chapterNumber
  chapterURL
  crossReferences(first: $crossReferencesPageSize) {
    edges {
      node {
        id
        ...CrossReference_reference
      }
    }
  }
  book {
    id
    title
  }
  notes(first: $notesPageSize) {
    pageInfo {
      hasNextPage
    }
    edges {
      node {
        id
        title
        body
        ...NoteThumbnail_note
      }
    }
  }
}

fragment CrossReference_reference on CrossReference {
  id
  reference
  verses(first: 100) {
    edges {
      node {
        id
        reference
        body
      }
    }
  }
}

fragment NoteThumbnail_note on Note {
  id
  created_at
  title
  body
  tags
  author {
    name
    email
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
      },
      {
        "kind": "LocalArgument",
        "name": "crossReferencesPageSize",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "notesPageSize",
        "type": "Int!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ScriptureViewerQuery",
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
            "concreteType": "BibleVerse",
            "name": "bibleVerse",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "BibleWidget_bibleVerse",
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
  "name": "ScriptureViewerQuery",
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
      },
      {
        "kind": "LocalArgument",
        "name": "crossReferencesPageSize",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "notesPageSize",
        "type": "Int!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "ScriptureViewerQuery",
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
                "name": "chapterNumber",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "chapterURL",
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
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "first",
                                "value": 100,
                                "type": "Int"
                              }
                            ],
                            "concreteType": "BibleVerse2Connection",
                            "name": "verses",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "args": null,
                                "concreteType": "BibleVerse2Edge",
                                "name": "edges",
                                "plural": true,
                                "selections": [
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "BibleVerse2",
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
                            "storageKey": "verses{\"first\":100}"
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
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "first",
                    "variableName": "notesPageSize",
                    "type": "Int"
                  }
                ],
                "concreteType": "NoteConnection",
                "name": "notes",
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
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "NoteEdge",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "Note",
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
                            "name": "title",
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
                            "name": "created_at",
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
                                "name": "email",
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
                "concreteType": "BibleVerse",
                "name": "previous",
                "plural": false,
                "selections": [
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
                "concreteType": "BibleVerse",
                "name": "next",
                "plural": false,
                "selections": [
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
  "text": "query ScriptureViewerQuery(\n  $token: String\n  $reference: String\n  $crossReferencesPageSize: Int!\n  $notesPageSize: Int!\n) {\n  viewer(token: $token) {\n    ...BibleWidget_viewer\n    bibleVerses(id: $reference) {\n      ...BibleWidget_verses\n    }\n    bibleVerse(id: $reference) {\n      ...BibleWidget_bibleVerse\n      id\n    }\n  }\n}\n\nfragment BibleWidget_viewer on Viewer {\n  ...BibleVerse_viewer\n  ...FocusedBibleVerse_viewer\n  id\n}\n\nfragment BibleWidget_verses on BibleVerseConnection {\n  pageInfo {\n    hasNextPage\n    hasPreviousPage\n    startCursor\n    endCursor\n  }\n  info {\n    nextChapterURL\n    previousChapterURL\n  }\n  edges {\n    cursor\n    node {\n      ...BibleVerse_verse\n      id\n      body\n      reference\n      verseNumber\n      chapter {\n        id\n        order_by\n      }\n      book {\n        id\n        title\n      }\n    }\n  }\n}\n\nfragment BibleWidget_bibleVerse on BibleVerse {\n  ...FocusedBibleVerse_verse\n  previous {\n    reference\n    id\n  }\n  next {\n    reference\n    id\n  }\n}\n\nfragment FocusedBibleVerse_verse on BibleVerse {\n  id\n  reference\n  body\n  verseNumber\n  chapterNumber\n  chapterURL\n  crossReferences(first: $crossReferencesPageSize) {\n    edges {\n      node {\n        id\n        ...CrossReference_reference\n      }\n    }\n  }\n  book {\n    id\n    title\n  }\n  notes(first: $notesPageSize) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      node {\n        id\n        title\n        body\n        ...NoteThumbnail_note\n      }\n    }\n  }\n}\n\nfragment CrossReference_reference on CrossReference {\n  id\n  reference\n  verses(first: 100) {\n    edges {\n      node {\n        id\n        reference\n        body\n      }\n    }\n  }\n}\n\nfragment NoteThumbnail_note on Note {\n  id\n  created_at\n  title\n  body\n  tags\n  author {\n    name\n    email\n    id\n  }\n  verse {\n    id\n    body\n    reference\n    url\n    notesCount\n    verseNumber\n    quote\n  }\n}\n\nfragment BibleVerse_verse on BibleVerse {\n  id\n  body\n  verseNumber\n  reference\n}\n\nfragment BibleVerse_viewer on Viewer {\n  id\n  authenticated\n}\n\nfragment FocusedBibleVerse_viewer on Viewer {\n  id\n  ...NoteThumbnail_viewer\n}\n\nfragment NoteThumbnail_viewer on Viewer {\n  authenticated\n}\n"
};

module.exports = batch;
