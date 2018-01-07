/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type UserTrackList_viewer = {|
  +authenticated: ?boolean;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserTrackList_viewer",
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "UserTrack_viewer",
      "args": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "authenticated",
      "storageKey": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
