/**
 * @generated SignedSource<<ef3887ee4aae624e157bde5d37b96876>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "email"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "password"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "username"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      },
      {
        "kind": "Variable",
        "name": "password",
        "variableName": "password"
      },
      {
        "kind": "Variable",
        "name": "username",
        "variableName": "username"
      }
    ],
    "concreteType": "AuthPayload",
    "kind": "LinkedField",
    "name": "registerUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "username",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RegisterUserMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "RegisterUserMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "8e4a9ee22b4732d789242aaf227d6a66",
    "id": null,
    "metadata": {},
    "name": "RegisterUserMutation",
    "operationKind": "mutation",
    "text": "mutation RegisterUserMutation(\n  $username: String!\n  $email: String!\n  $password: String!\n) {\n  registerUser(username: $username, email: $email, password: $password) {\n    token\n    username\n    email\n  }\n}\n"
  }
};
})();

node.hash = "fce4733c9403cb2b1d728d0b1a6e6426";

module.exports = node;
