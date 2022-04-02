import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Card from "../Components/Card";
import Loader from "../Components/Loader";
import { AuthContext } from "../context";
import { getMovies } from "../Services/movie";

export default function History() {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getMovies(user.history)
        .then((data) => setHistory(data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  return loading ? (
    <Loader />
  ) : user ? (
    <div className="container">
      <h2 className="mt-4">Watch History</h2>
      <hr />
      <div className="d-flex flex-wrap justify-content-around">
        {user.history.length ? (
          history.map((data) => (
            <Card data={data} key={data.title} show={true} />
          ))
        ) : (
          <h6 className="mt-5">No Watch History</h6>
        )}
      </div>
    </div>
  ) : (
    <Navigate to="login" />
  );
}
