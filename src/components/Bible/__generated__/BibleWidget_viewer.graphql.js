/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type BibleWidget_viewer = {|
  +id: ?string;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BibleWidget_viewer",
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "BibleVerse_viewer",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "FocusedBibleVerse_viewer",
      "args": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
