/**
 * @generated SignedSource<<190c1a27986ea559a3dbb38156430d00>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Dorama",
    "kind": "LinkedField",
    "name": "allDoramas",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "summary",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "episodes",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "genre",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "year",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "trailer",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "image",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "homeAllDoramasQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "homeAllDoramasQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "c37334c0bf36681da7fb72a2c22c60e3",
    "id": null,
    "metadata": {},
    "name": "homeAllDoramasQuery",
    "operationKind": "query",
    "text": "query homeAllDoramasQuery {\n  allDoramas {\n    id\n    title\n    summary\n    episodes\n    genre\n    year\n    trailer\n    image\n  }\n}\n"
  }
};
})();

node.hash = "e1d152e046602a86a46e302c73e2635d";

module.exports = node;
