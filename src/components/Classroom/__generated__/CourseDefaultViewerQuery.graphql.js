/**
 * @flow
 * @relayHash e0ba864eee42c632bf3dfa516ba9430b
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type CourseDefaultViewerQueryResponse = {|
  +viewer: ?{|
    +courses: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +node: ?{|
          +id: string;
        |};
      |}>;
    |};
  |};
|};
*/


/*
query CourseDefaultViewerQuery(
  $coursesPageSize: Int!
) {
  viewer {
    ...CourseWidget_viewer
    ...Navbar_viewer
    courses(first: $coursesPageSize, orderBy: "title:ASC", filter: "public:1") {
      ...CourseWidget_courses
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
  }
}

fragment CourseWidget_viewer on Viewer {
  ...CourseBadge_viewer
}

fragment Navbar_viewer on Viewer {
  authenticated
  email
  name
}

fragment CourseWidget_courses on CourseConnection {
  edges {
    node {
      id
      title
      description
      ...CourseBadge_course
    }
  }
}

fragment CourseBadge_course on Course {
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

fragment CourseBadge_viewer on Viewer {
  id
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "coursesPageSize",
        "type": "Int!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CourseDefaultViewerQuery",
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
            "name": "CourseWidget_viewer",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "Navbar_viewer",
            "args": null
          },
          {
            "kind": "LinkedField",
            "alias": "courses",
            "args": null,
            "concreteType": "CourseConnection",
            "name": "__CourseWidget_courses_connection",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "CourseWidget_courses",
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
      }
    ]
  },
  "name": "CourseDefaultViewerQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "coursesPageSize",
        "type": "Int!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "CourseDefaultViewerQuery",
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
                "value": "title:ASC",
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
                "value": "title:ASC",
                "type": "String"
              }
            ],
            "handle": "connection",
            "name": "courses",
            "key": "CourseWidget_courses",
            "filters": []
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query CourseDefaultViewerQuery(\n  $coursesPageSize: Int!\n) {\n  viewer {\n    ...CourseWidget_viewer\n    ...Navbar_viewer\n    courses(first: $coursesPageSize, orderBy: \"title:ASC\", filter: \"public:1\") {\n      ...CourseWidget_courses\n      edges {\n        node {\n          id\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment CourseWidget_viewer on Viewer {\n  ...CourseBadge_viewer\n}\n\nfragment Navbar_viewer on Viewer {\n  authenticated\n  email\n  name\n}\n\nfragment CourseWidget_courses on CourseConnection {\n  edges {\n    node {\n      id\n      title\n      description\n      ...CourseBadge_course\n    }\n  }\n}\n\nfragment CourseBadge_course on Course {\n  id\n  title\n  description\n  updated_at\n  created_at\n  owner {\n    id\n    name\n  }\n}\n\nfragment CourseBadge_viewer on Viewer {\n  id\n}\n"
};

module.exports = batch;
