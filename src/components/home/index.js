import React from "react";
import "./index.css";
import graphql from "babel-plugin-relay/macro";
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
} from "react-relay/hooks";
import environment from "../../Environment";

const { Suspense } = React;

// Define a query
const AllDoramas = graphql`
  query homeAllDoramasQuery {
    allDoramas {
      id
      title
      summary
      episodes
      genre
      year
      trailer
      image
    }
  }
`;

// Immediately load the query as our app starts. For a real app, we'd move this
// into our routing configuration, preloading data as we transition to new routes.
const preloadedQuery = loadQuery(environment, AllDoramas, {
  /* query variables */
});

// Inner component that reads the preloaded query results via `usePreloadedQuery()`.
// This works as follows:
// - If the query has completed, it returns the results of the query.
// - If the query is still pending, it "suspends" (indicates to React that the
//   component isn't ready to render yet). This will show the nearest <Suspense>
//   fallback.
// - If the query failed, it throws the failure error. For simplicity we aren't
//   handling the failure case here.
function ListDoramas(props) {
  const { allDoramas } = usePreloadedQuery(AllDoramas, props.preloadedQuery);
  return (
    <>
      <div className="home">
        {Object.values(allDoramas).map((result) => {
          return <div key={result.id}>{result.title}</div>;
        })}
      </div>
    </>
  );
}

// The above component needs to know how to access the Relay environment, and we
// need to specify a fallback in case it suspends:
// - <RelayEnvironmentProvider> tells child components how to talk to the current
//   Relay Environment instance
// - <Suspense> specifies a fallback in case a child suspends.
export function Home(props) {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={"Loading..."}>
        <ListDoramas preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}
