/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type NotesWidget_viewer = {|
  +authenticated: ?boolean;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NotesWidget_viewer",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "authenticated",
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "NoteThumbnail_user",
      "args": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
