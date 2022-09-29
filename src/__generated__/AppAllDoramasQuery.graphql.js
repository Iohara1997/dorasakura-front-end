/**
 * @generated SignedSource<<8d299e2668bbfd893de663651e96526c>>
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
    "name": "AppAllDoramasQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppAllDoramasQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "ed49369de6110d713000c91fad6ffaa6",
    "id": null,
    "metadata": {},
    "name": "AppAllDoramasQuery",
    "operationKind": "query",
    "text": "query AppAllDoramasQuery {\n  allDoramas {\n    id\n    title\n    summary\n    episodes\n    genre\n    year\n    trailer\n    image\n  }\n}\n"
  }
};
})();

node.hash = "79c6bc5a0bcfcebd87196a0c5ad7894c";

module.exports = node;
