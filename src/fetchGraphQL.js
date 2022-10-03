import { GC_AUTH_TOKEN } from "./constants";

export async function fetchGraphQL(
  operation,
  variables,
  cacheConfig,
  uploadables
) {
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
