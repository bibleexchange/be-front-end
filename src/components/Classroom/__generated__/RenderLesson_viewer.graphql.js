/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type RenderLesson_viewer = {|
  +id: ?string;
  +authenticated: ?boolean;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RenderLesson_viewer",
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ActivityReadThis_viewer",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ActivityReadThisReference_viewer",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ActivityQuizThis_viewer",
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
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
