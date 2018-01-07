/**
 * @flow
 * @relayHash 8cb5c96e83670b4255c5290124b42cd7
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type DeleteNoteMutationVariables = {|
  input: {
    id: string;
    clientMutationId: string;
  };
|};

export type DeleteNoteMutationResponse = {|
  +deleteNote: ?{|
    +deletedId: ?string;
  |};
|};
*/


/*
mutation DeleteNoteMutation(
  $input: DeleteNoteInput!
) {
  deleteNote(input: $input) {
    deletedId
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "DeleteNoteInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteNoteMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "DeleteNoteInput!"
          }
        ],
        "concreteType": "DeleteNotePayload",
        "name": "deleteNote",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "deletedId",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "DeleteNoteMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "DeleteNoteInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "DeleteNoteMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "DeleteNoteInput!"
          }
        ],
        "concreteType": "DeleteNotePayload",
        "name": "deleteNote",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "deletedId",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation DeleteNoteMutation(\n  $input: DeleteNoteInput!\n) {\n  deleteNote(input: $input) {\n    deletedId\n  }\n}\n"
};

module.exports = batch;
