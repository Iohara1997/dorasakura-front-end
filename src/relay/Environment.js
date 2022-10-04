import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { fetchGraphQL } from "./fetchGraphQL";

const network = Network.create(fetchGraphQL);
const store = new Store(new RecordSource());

const environment = new Environment({
  network,
  store,
  // ... other options
});

export default environment;
