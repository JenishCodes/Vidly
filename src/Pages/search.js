import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../Components/Card";
import Loader from "../Components/Loader";
import { getSuggestions } from "../Services/movie";

export default function Search() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();

  useEffect(() => {
    const searchQuery = search.replace("?query=", "");

    getSuggestions(searchQuery, 30)
      .then((data) => setResults(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [search]);

  return loading ? (
    <Loader blur={false} />
  ) : (
    <div className="container mt-4">
      <h2 className="mt-4">Search Results for {search.replace("?query=", "")}</h2>
      <hr />
      <div className="d-flex flex-wrap justify-content-around">
        {results ? (
          results.map((data) => (
            <Card data={data} key={data.title} show={true} />
          ))
        ) : (
          <h6 className="mt-5">No Search Results</h6>
        )}
      </div>
    </div>
  );
}
