/**
 * @flow
 * @relayHash 2a799afd14b2904d76047c659f2c0922
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type DashboardViewerQueryResponse = {|
  +viewer: ?{|
    +id: ?string;
    +authenticated: ?boolean;
    +name: ?string;
    +email: ?string;
    +verified: ?string;
  |};
|};
*/


/*
query DashboardViewerQuery(
  $token: String
) {
  viewer(token: $token) {
    ...Navbar_viewer
    ...DashboardMenu_viewer
    id
    authenticated
    name
    email
    verified
  }
}

fragment Navbar_viewer on Viewer {
  authenticated
  email
  name
}

fragment DashboardMenu_viewer on Viewer {
  authenticated
  email
  name
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
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DashboardViewerQuery",
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
            "name": "DashboardMenu_viewer",
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
            "name": "verified",
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
  "name": "DashboardViewerQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "token",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "DashboardViewerQuery",
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
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "verified",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query DashboardViewerQuery(\n  $token: String\n) {\n  viewer(token: $token) {\n    ...Navbar_viewer\n    ...DashboardMenu_viewer\n    id\n    authenticated\n    name\n    email\n    verified\n  }\n}\n\nfragment Navbar_viewer on Viewer {\n  authenticated\n  email\n  name\n}\n\nfragment DashboardMenu_viewer on Viewer {\n  authenticated\n  email\n  name\n}\n"
};

module.exports = batch;
