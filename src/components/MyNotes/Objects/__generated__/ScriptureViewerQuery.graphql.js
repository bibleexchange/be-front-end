/**
 * @flow
 * @relayHash 567d2954378f82c2ab984eff084ba761
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ScriptureViewerQueryResponse = {|
  +viewer: ?{|
    +bibleChapter: ?{| |};
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
    bibleChapter(id: $reference) {
      ...BibleWidget_bibleChapter
      id
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

fragment BibleWidget_bibleChapter on BibleChapter {
  id
  url
  reference
  nextChapter {
    id
    reference
  }
  previousChapter {
    id
    reference
  }
  verses(first: 200) {
    edges {
      node {
        ...BibleVerse_verse
        id
        verseNumber
        body
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
        ...BibleNote_note
      }
    }
  }
}

fragment CrossReference_reference on CrossReference {
  id
  reference
  verses {
    edges {
      node {
        id
        reference
        body
      }
    }
  }
}

fragment BibleNote_note on Note {
  ...NoteThumbnail_note
  id
}

fragment NoteThumbnail_note on Note {
  id
  created_at
  title
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
  ...BibleNote_viewer
}

fragment BibleNote_viewer on Viewer {
  ...NoteThumbnail_viewer
  id
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
            "concreteType": "BibleChapter",
            "name": "bibleChapter",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "BibleWidget_bibleChapter",
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
            "concreteType": "BibleChapter",
            "name": "bibleChapter",
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
                "name": "url",
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
                "concreteType": "BibleChapter",
                "name": "nextChapter",
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
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "BibleChapter",
                "name": "previousChapter",
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
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 200,
                    "type": "Int"
                  }
                ],
                "concreteType": "BibleVerseConnection",
                "name": "verses",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "BibleVerseEdge",
                    "name": "edges",
                    "plural": true,
                    "selections": [
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
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "verses{\"first\":200}"
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
                "name": "chapterURL",
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
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "args": null,
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
  "text": "query ScriptureViewerQuery(\n  $token: String\n  $reference: String\n  $crossReferencesPageSize: Int!\n  $notesPageSize: Int!\n) {\n  viewer(token: $token) {\n    ...BibleWidget_viewer\n    bibleChapter(id: $reference) {\n      ...BibleWidget_bibleChapter\n      id\n    }\n    bibleVerse(id: $reference) {\n      ...BibleWidget_bibleVerse\n      id\n    }\n  }\n}\n\nfragment BibleWidget_viewer on Viewer {\n  ...BibleVerse_viewer\n  ...FocusedBibleVerse_viewer\n  id\n}\n\nfragment BibleWidget_bibleChapter on BibleChapter {\n  id\n  url\n  reference\n  nextChapter {\n    id\n    reference\n  }\n  previousChapter {\n    id\n    reference\n  }\n  verses(first: 200) {\n    edges {\n      node {\n        ...BibleVerse_verse\n        id\n        verseNumber\n        body\n      }\n    }\n  }\n}\n\nfragment BibleWidget_bibleVerse on BibleVerse {\n  ...FocusedBibleVerse_verse\n  previous {\n    reference\n    id\n  }\n  next {\n    reference\n    id\n  }\n}\n\nfragment FocusedBibleVerse_verse on BibleVerse {\n  id\n  reference\n  body\n  verseNumber\n  chapterNumber\n  chapterURL\n  crossReferences(first: $crossReferencesPageSize) {\n    edges {\n      node {\n        id\n        ...CrossReference_reference\n      }\n    }\n  }\n  book {\n    id\n    title\n  }\n  notes(first: $notesPageSize) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      node {\n        id\n        title\n        body\n        ...BibleNote_note\n      }\n    }\n  }\n}\n\nfragment CrossReference_reference on CrossReference {\n  id\n  reference\n  verses {\n    edges {\n      node {\n        id\n        reference\n        body\n      }\n    }\n  }\n}\n\nfragment BibleNote_note on Note {\n  ...NoteThumbnail_note\n  id\n}\n\nfragment NoteThumbnail_note on Note {\n  id\n  created_at\n  title\n  tags\n  author {\n    name\n    id\n  }\n  verse {\n    id\n    body\n    reference\n    url\n    notesCount\n    verseNumber\n    quote\n  }\n}\n\nfragment BibleVerse_verse on BibleVerse {\n  id\n  body\n  verseNumber\n  reference\n}\n\nfragment BibleVerse_viewer on Viewer {\n  id\n  authenticated\n}\n\nfragment FocusedBibleVerse_viewer on Viewer {\n  id\n  ...BibleNote_viewer\n}\n\nfragment BibleNote_viewer on Viewer {\n  ...NoteThumbnail_viewer\n  id\n}\n\nfragment NoteThumbnail_viewer on Viewer {\n  authenticated\n}\n"
};

module.exports = batch;
