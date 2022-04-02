import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router";
import Card from "../Components/Card";
import Loader from "../Components/Loader";
import { AuthContext } from "../context";
import { getUserInterest } from "../Services/user";

export default function Recommandation() {
  const { user } = useContext(AuthContext);
  const [recommandations, setRecommandations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getUserInterest(user.history)
        .then((data) => setRecommandations(data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  return loading ? (
    <Loader blur={false} />
  ) :user? (
    <div className="container">
      <h2 className="mt-4">Movies Recommanded For You</h2>
      <hr />
      <div className="d-flex flex-wrap justify-content-around">
        {recommandations ? (
          recommandations.map((data) => (
            <Card data={data} key={data.title} show={true} tip="Recommendation Score" />
          ))
        ) : (
          <h6 className="mt-5">No Recommendations</h6>
        )}
      </div>
    </div>
  ):<Navigate to="login" />;
}
