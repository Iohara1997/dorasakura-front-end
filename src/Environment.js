import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { GC_AUTH_TOKEN } from "./constants";

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
function fetchQuery(operation, variables, cacheConfig, uploadables) {
  return fetch("http://localhost:5000/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem(GC_AUTH_TOKEN)}`,
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then((response) => {
    return response.json();
  });
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);
const store = new Store(new RecordSource());

const environment = new Environment({
  network,
  store,
  // ... other options
});

export default environment;
