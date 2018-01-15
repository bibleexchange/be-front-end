/**
 * @flow
 * @relayHash 543bbd769cdebab1138726855d985f3e
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type HomeViewerQueryResponse = {|
  +viewer: ?{|
    +id: ?string;
    +authenticated: ?boolean;
    +courses: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +node: ?{|
          +id: string;
        |};
      |}>;
    |};
    +userTracks: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +node: ?{|
          +id: string;
        |};
      |}>;
    |};
    +bibleVerses: ?{| |};
    +bibleVerse: ?{| |};
  |};
|};
*/


/*
query HomeViewerQuery(
  $token: String!
  $tracksPageSize: Int!
  $coursesPageSize: Int!
  $reference: String!
  $notesPageSize: Int!
  $crossReferencesPageSize: Int!
) {
  viewer(token: $token) {
    ...CourseList_viewer
    ...Navbar_viewer
    ...BibleWidget_viewer
    ...UserTrackList_viewer
    id
    authenticated
    courses(first: $coursesPageSize, orderBy: "created_at:DESC", filter: "public:1") {
      ...CourseList_courses
      edges {
        node {
          id
          __typename
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    userTracks(first: $tracksPageSize) {
      ...UserTrackList_userTracks
      edges {
        node {
          id
          __typename
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    bibleVerses(id: $reference) {
      ...BibleWidget_verses
    }
    bibleVerse(id: $reference) {
      ...BibleWidget_bibleVerse
      id
    }
  }
}

fragment CourseList_viewer on Viewer {
  ...Course_viewer
}

fragment Navbar_viewer on Viewer {
  authenticated
  email
  name
}

fragment BibleWidget_viewer on Viewer {
  ...BibleVerse_viewer
  ...FocusedBibleVerse_viewer
  id
}

fragment UserTrackList_viewer on Viewer {
  ...UserTrack_viewer
  authenticated
}

fragment CourseList_courses on CourseConnection {
  edges {
    node {
      id
      title
      description
      ...Course_course
    }
  }
}

fragment UserTrackList_userTracks on TrackConnection {
  edges {
    node {
      id
      ...UserTrack_userTrack
    }
  }
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

fragment UserTrack_userTrack on Track {
  id
  course {
    id
    title
  }
}

fragment Course_course on Course {
  id
  title
  description
  updated_at
  created_at
  owner {
    id
    name
  }
}

fragment UserTrack_viewer on Viewer {
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

fragment Course_viewer on Viewer {
  id
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "token",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "tracksPageSize",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "coursesPageSize",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "reference",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "notesPageSize",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "crossReferencesPageSize",
        "type": "Int!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeViewerQuery",
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
            "name": "CourseList_viewer",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "Navbar_viewer",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "BibleWidget_viewer",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "UserTrackList_viewer",
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
            "name": "authenticated",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": "courses",
            "args": null,
            "concreteType": "CourseConnection",
            "name": "__CourseList_courses_connection",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "CourseList_courses",
                "args": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "CourseEdge",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Course",
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
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "hasNextPage",
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
            "alias": "userTracks",
            "args": null,
            "concreteType": "TrackConnection",
            "name": "__UserTrackList_userTracks_connection",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "UserTrackList_userTracks",
                "args": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "TrackEdge",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Track",
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
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "hasNextPage",
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
  "metadata": {
    "connection": [
      {
        "count": "coursesPageSize",
        "cursor": null,
        "direction": "forward",
        "path": [
          "viewer",
          "courses"
        ]
      },
      {
        "count": "tracksPageSize",
        "cursor": null,
        "direction": "forward",
        "path": [
          "viewer",
          "userTracks"
        ]
      }
    ]
  },
  "name": "HomeViewerQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "token",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "tracksPageSize",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "coursesPageSize",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "reference",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "notesPageSize",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "crossReferencesPageSize",
        "type": "Int!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "HomeViewerQuery",
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
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "filter",
                "value": "public:1",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "coursesPageSize",
                "type": "Int"
              },
              {
                "kind": "Literal",
                "name": "orderBy",
                "value": "created_at:DESC",
                "type": "String"
              }
            ],
            "concreteType": "CourseConnection",
            "name": "courses",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "CourseEdge",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Course",
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
                        "name": "description",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "updated_at",
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
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "name": "owner",
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
                            "name": "name",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "filter",
                "value": "public:1",
                "type": "String"
              },
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "coursesPageSize",
                "type": "Int"
              },
              {
                "kind": "Literal",
                "name": "orderBy",
                "value": "created_at:DESC",
                "type": "String"
              }
            ],
            "handle": "connection",
            "name": "courses",
            "key": "CourseList_courses",
            "filters": []
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "tracksPageSize",
                "type": "Int"
              }
            ],
            "concreteType": "TrackConnection",
            "name": "userTracks",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "TrackEdge",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Track",
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
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "Course",
                        "name": "course",
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
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "tracksPageSize",
                "type": "Int"
              }
            ],
            "handle": "connection",
            "name": "userTracks",
            "key": "UserTrackList_userTracks",
            "filters": []
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
  "text": "query HomeViewerQuery(\n  $token: String!\n  $tracksPageSize: Int!\n  $coursesPageSize: Int!\n  $reference: String!\n  $notesPageSize: Int!\n  $crossReferencesPageSize: Int!\n) {\n  viewer(token: $token) {\n    ...CourseList_viewer\n    ...Navbar_viewer\n    ...BibleWidget_viewer\n    ...UserTrackList_viewer\n    id\n    authenticated\n    courses(first: $coursesPageSize, orderBy: \"created_at:DESC\", filter: \"public:1\") {\n      ...CourseList_courses\n      edges {\n        node {\n          id\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    userTracks(first: $tracksPageSize) {\n      ...UserTrackList_userTracks\n      edges {\n        node {\n          id\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    bibleVerses(id: $reference) {\n      ...BibleWidget_verses\n    }\n    bibleVerse(id: $reference) {\n      ...BibleWidget_bibleVerse\n      id\n    }\n  }\n}\n\nfragment CourseList_viewer on Viewer {\n  ...Course_viewer\n}\n\nfragment Navbar_viewer on Viewer {\n  authenticated\n  email\n  name\n}\n\nfragment BibleWidget_viewer on Viewer {\n  ...BibleVerse_viewer\n  ...FocusedBibleVerse_viewer\n  id\n}\n\nfragment UserTrackList_viewer on Viewer {\n  ...UserTrack_viewer\n  authenticated\n}\n\nfragment CourseList_courses on CourseConnection {\n  edges {\n    node {\n      id\n      title\n      description\n      ...Course_course\n    }\n  }\n}\n\nfragment UserTrackList_userTracks on TrackConnection {\n  edges {\n    node {\n      id\n      ...UserTrack_userTrack\n    }\n  }\n}\n\nfragment BibleWidget_verses on BibleVerseConnection {\n  pageInfo {\n    hasNextPage\n    hasPreviousPage\n    startCursor\n    endCursor\n  }\n  info {\n    nextChapterURL\n    previousChapterURL\n  }\n  edges {\n    cursor\n    node {\n      ...BibleVerse_verse\n      id\n      body\n      reference\n      verseNumber\n      chapter {\n        id\n        order_by\n      }\n      book {\n        id\n        title\n      }\n    }\n  }\n}\n\nfragment BibleWidget_bibleVerse on BibleVerse {\n  ...FocusedBibleVerse_verse\n  previous {\n    reference\n    id\n  }\n  next {\n    reference\n    id\n  }\n}\n\nfragment FocusedBibleVerse_verse on BibleVerse {\n  id\n  reference\n  body\n  verseNumber\n  chapterNumber\n  chapterURL\n  crossReferences(first: $crossReferencesPageSize) {\n    edges {\n      node {\n        id\n        ...CrossReference_reference\n      }\n    }\n  }\n  book {\n    id\n    title\n  }\n  notes(first: $notesPageSize) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      node {\n        id\n        title\n        body\n        ...NoteThumbnail_note\n      }\n    }\n  }\n}\n\nfragment CrossReference_reference on CrossReference {\n  id\n  reference\n  verses {\n    edges {\n      node {\n        id\n        reference\n        body\n      }\n    }\n  }\n}\n\nfragment NoteThumbnail_note on Note {\n  id\n  created_at\n  title\n  body\n  tags\n  author {\n    name\n    email\n    id\n  }\n  verse {\n    id\n    body\n    reference\n    url\n    notesCount\n    verseNumber\n    quote\n  }\n}\n\nfragment BibleVerse_verse on BibleVerse {\n  id\n  body\n  verseNumber\n  reference\n}\n\nfragment UserTrack_userTrack on Track {\n  id\n  course {\n    id\n    title\n  }\n}\n\nfragment Course_course on Course {\n  id\n  title\n  description\n  updated_at\n  created_at\n  owner {\n    id\n    name\n  }\n}\n\nfragment UserTrack_viewer on Viewer {\n  id\n}\n\nfragment BibleVerse_viewer on Viewer {\n  id\n  authenticated\n}\n\nfragment FocusedBibleVerse_viewer on Viewer {\n  id\n  ...NoteThumbnail_viewer\n}\n\nfragment NoteThumbnail_viewer on Viewer {\n  authenticated\n}\n\nfragment Course_viewer on Viewer {\n  id\n}\n"
};

module.exports = batch;
