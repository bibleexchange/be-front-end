/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type NoteViewer_viewer = {|
  +authenticated: ?boolean;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {},
  "name": "NoteViewer_viewer",
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
      "name": "BibleWidget_viewer",
      "args": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
