import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Layout } from "antd";
import Navbar from "./Components/Navbar";
import MovieModal from "./Components/Modal";
import Player from "./Components/Player";
import Footer from "./Components/Footer";
import { markMovieWatched } from "./Services/user";
import Profile from "./Components/Profile";

export const MovieContext = React.createContext();

function ProtectedRoute({ children }) {
  const { isUserSignedIn } = useAuth();
  const [movie, setMovie] = useState(null);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [triggerWatchedCallId, setTriggerWatchedCallId] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const updateCurrentPlaying = (id, title, trailer) => {
    if (id && title && trailer) {
      setCurrentPlaying({
        id,
        title,
        trailer,
      });

      setTriggerWatchedCallId(
        setTimeout(
          () =>
            markMovieWatched(id).finally(() => setTriggerWatchedCallId(null)),
          5000
        )
      );
    } else {
      if (triggerWatchedCallId) {
        clearTimeout(triggerWatchedCallId);
        setTriggerWatchedCallId(null);
      }

      setCurrentPlaying(null);
    }
  };

  return isUserSignedIn ? (
    <MovieContext.Provider value={{ setMovie, updateCurrentPlaying, setIsProfileOpen }}>
      <Layout className="layout">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <MovieModal movie={movie} setMovie={setMovie} />
        <Profile isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} />
        <Footer />
      </Layout>
      <Player
        currentPlaying={currentPlaying}
        updateCurrentPlaying={updateCurrentPlaying}
      />
    </MovieContext.Provider>
  ) : (
    <Navigate to="/signin" />
  );
}

export default ProtectedRoute;
