/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type BibleWidget_bibleVerse = {|
  +previous: ?{|
    +reference: ?string;
  |};
  +next: ?{|
    +reference: ?string;
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BibleWidget_bibleVerse",
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "FocusedBibleVerse_verse",
      "args": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "BibleVerse",
      "name": "previous",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "reference",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "BibleVerse",
      "name": "next",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "reference",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "BibleVerse"
};

module.exports = fragment;
