import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { GC_AUTH_TOKEN } from "./constants";

async function fetchQuery(operation, variables, cacheConfig, uploadables) {
  const response = await fetch("http://localhost:5000/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem(GC_AUTH_TOKEN)}`,
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });
  return await response.json();
}

const network = Network.create(fetchQuery);
const store = new Store(new RecordSource());

const environment = new Environment({
  network,
  store,
  // ... other options
});

export default environment;
