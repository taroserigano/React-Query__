import React, { useState } from "react";
import { useQuery } from "react-query";
import Character from "./Character";

export default function Characters() {
  const [page, setPage] = useState(40);

  // queryKey will have [characterName, pageNumber ] 
  const fetchCharacters = async ({ queryKey }) => {
    const response = await fetch(
      // specify the pageNumber on 2nd item in the array [] 
      `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
    );
    return response.json();
  };

  const { data, status, isPreviousData } = useQuery(
    ["characters", page],
    fetchCharacters,
    {
      keepPreviousData: true,
    }
  );

  console.log(isPreviousData);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div className="characters">
      {data.results.map((character) => (
        <Character character={character} />
      ))}
      <div>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((old) => old + 1)}

          //  with  "!", if data info next is null, return true and disable it !
          disabled={!data.info.next}
        >
          Next
        </button>
      </div>
    </div>
  );
}
