/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type MyNotes_bibleVerse = {|
  +id: string;
  +reference: ?string;
  +quote: ?string;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyNotes_bibleVerse",
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "MyNotesComponent_verse",
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
      "name": "reference",
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
  "type": "BibleVerse"
};

module.exports = fragment;
