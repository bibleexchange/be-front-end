/**
 * @flow
 * @relayHash 6958a8948d02824ddc35393a28284060
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type CoursePreviewViewerQueryResponse = {|
  +viewer: ?{|
    +course: ?{|
      +id: string;
      +textbook: ?string;
    |};
    +userTrack: ?{|
      +id: string;
      +course: ?{|
        +id: string;
        +title: ?string;
      |};
      +activity: ?{|
        +id: string;
        +body: ?string;
        +order_by: ?number;
        +lesson: ?{|
          +id: string;
          +title: ?string;
          +order_by: ?number;
        |};
      |};
    |};
  |};
|};
*/


/*
query CoursePreviewViewerQuery(
  $token: String!
  $courseID: String!
) {
  viewer(token: $token) {
    ...ActivityQuizThis_viewer
    ...Navbar_viewer
    ...Download_viewer
    course(id: $courseID) {
      id
      textbook
    }
    userTrack(id: $courseID) {
      ...Download_track
      id
      course {
        id
        title
      }
      activity {
        id
        body
        order_by
        lesson {
          id
          title
          order_by
        }
      }
    }
  }
}

fragment ActivityQuizThis_viewer on Viewer {
  id
  authenticated
}

fragment Navbar_viewer on Viewer {
  authenticated
  email
  name
}

fragment Download_viewer on Viewer {
  ...RenderLesson_viewer
  id
  authenticated
}

fragment Download_track on Track {
  id
  ...RenderLesson_track
}

fragment RenderLesson_track on Track {
  ...ActivityReadThis_track
  ...ActivityReadThisReference_track
  ...ActivityQuizThis_track
  id
  course {
    id
    title
  }
  activity {
    id
    body
    order_by
    lesson {
      id
      title
      order_by
    }
  }
}

fragment ActivityReadThis_track on Track {
  id
  activity {
    id
    body
  }
}

fragment ActivityReadThisReference_track on Track {
  id
  activity {
    id
    body
  }
}

fragment ActivityQuizThis_track on Track {
  id
  activity {
    id
    body
  }
}

fragment RenderLesson_viewer on Viewer {
  ...ActivityReadThis_viewer
  ...ActivityReadThisReference_viewer
  ...ActivityQuizThis_viewer
  id
  authenticated
}

fragment ActivityReadThis_viewer on Viewer {
  id
}

fragment ActivityReadThisReference_viewer on Viewer {
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
        "name": "courseID",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CoursePreviewViewerQuery",
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
            "name": "ActivityQuizThis_viewer",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "Navbar_viewer",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "Download_viewer",
            "args": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "courseID",
                "type": "String"
              }
            ],
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
                "name": "textbook",
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
                "variableName": "courseID",
                "type": "String"
              }
            ],
            "concreteType": "Track",
            "name": "userTrack",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "Download_track",
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
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Activity",
                "name": "activity",
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
                    "name": "order_by",
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Lesson",
                    "name": "lesson",
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
                        "name": "order_by",
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
    "type": "ViewerQuery"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "CoursePreviewViewerQuery",
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
        "name": "courseID",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "CoursePreviewViewerQuery",
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
                "kind": "Variable",
                "name": "id",
                "variableName": "courseID",
                "type": "String"
              }
            ],
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
                "name": "textbook",
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
                "variableName": "courseID",
                "type": "String"
              }
            ],
            "concreteType": "Track",
            "name": "userTrack",
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
                "concreteType": "Activity",
                "name": "activity",
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
                    "name": "order_by",
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Lesson",
                    "name": "lesson",
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
                        "name": "order_by",
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query CoursePreviewViewerQuery(\n  $token: String!\n  $courseID: String!\n) {\n  viewer(token: $token) {\n    ...ActivityQuizThis_viewer\n    ...Navbar_viewer\n    ...Download_viewer\n    course(id: $courseID) {\n      id\n      textbook\n    }\n    userTrack(id: $courseID) {\n      ...Download_track\n      id\n      course {\n        id\n        title\n      }\n      activity {\n        id\n        body\n        order_by\n        lesson {\n          id\n          title\n          order_by\n        }\n      }\n    }\n  }\n}\n\nfragment ActivityQuizThis_viewer on Viewer {\n  id\n  authenticated\n}\n\nfragment Navbar_viewer on Viewer {\n  authenticated\n  email\n  name\n}\n\nfragment Download_viewer on Viewer {\n  ...RenderLesson_viewer\n  id\n  authenticated\n}\n\nfragment Download_track on Track {\n  id\n  ...RenderLesson_track\n}\n\nfragment RenderLesson_track on Track {\n  ...ActivityReadThis_track\n  ...ActivityReadThisReference_track\n  ...ActivityQuizThis_track\n  id\n  course {\n    id\n    title\n  }\n  activity {\n    id\n    body\n    order_by\n    lesson {\n      id\n      title\n      order_by\n    }\n  }\n}\n\nfragment ActivityReadThis_track on Track {\n  id\n  activity {\n    id\n    body\n  }\n}\n\nfragment ActivityReadThisReference_track on Track {\n  id\n  activity {\n    id\n    body\n  }\n}\n\nfragment ActivityQuizThis_track on Track {\n  id\n  activity {\n    id\n    body\n  }\n}\n\nfragment RenderLesson_viewer on Viewer {\n  ...ActivityReadThis_viewer\n  ...ActivityReadThisReference_viewer\n  ...ActivityQuizThis_viewer\n  id\n  authenticated\n}\n\nfragment ActivityReadThis_viewer on Viewer {\n  id\n}\n\nfragment ActivityReadThisReference_viewer on Viewer {\n  id\n}\n"
};

module.exports = batch;
