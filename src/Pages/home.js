import React, { useContext, useEffect, useState } from "react";
import SmallSlider from "../Components/SmallSlider";
import DetailedSlider from "../Components/DetailedSlider";
import { getUserInterest } from "../Services/user";
import Loader from "../Components/Loader";
import { Link } from "react-router-dom";
import { AuthContext } from "../context";
import { getMovies } from "../Services/movie";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState(null);
  const [interest, setInterest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.history && user.history.length > 0) {
      getMovies(user.history)
        .then((data) => setHistory(data.reverse()))
        .catch((err) => console.log(err));

      getUserInterest(user.history)
        .then((data) => setInterest(data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  return loading ? (
    <Loader blur={false} />
  ) : user ? (
    user.history && user.history.length > 0 ? (
      <div className="container">
        {interest ? <DetailedSlider movies={interest} /> : null}
        {history ? (
          <SmallSlider movies={history} title="Watch It Again" url="/history" />
        ) : null}
      </div>
    ) : (
      <div className="container text-center">
        <h5 className="mt-5">No Recommendations and History Available.</h5>
      </div>
    )
  ) : (
    <div className="container text-center">
      <h5 className="mt-5">To Get Recommendations You Need to Login.</h5>
      <div className="d-flex justify-content-center">
        <Link to="/login" className="mt-4 me-5">
          Login
        </Link>
        <Link to="/register" className="mt-4">
          Register
        </Link>
      </div>
    </div>
  );
}
