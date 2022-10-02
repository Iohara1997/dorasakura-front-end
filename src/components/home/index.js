import React from "react";
import "./index.css";
import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay/hooks";

function ListDoramas(props) {
  const response = useLazyLoadQuery(
    graphql`
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
    `,
    { first: 5 },
    {
      fetchPolicy: "network-only",
    }
  );

  const { allDoramas } = response;

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

export function Home(props) {
  return <ListDoramas />;
}
