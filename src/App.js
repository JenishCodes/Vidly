import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context";
import Title from "./Pages/title";
import Navbar from "./Components/Navbar";
import Home from "./Pages/home";
import Keyword from "./Pages/keyword";
import History from "./Pages/history";
import Recommandation from "./Pages/recommandations";
import SignIn from "./Pages/signIn";
import Search from "./Pages/search";
import SignUp from "./Pages/signUp";
import Forgot from "./Pages/forgot";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
            <Routes>
              <Route path="/" index element={<Home />} />
              <Route path="login" element={<SignIn />} />
              <Route path="register" element={<SignUp />} />
              <Route path="forgot" element={<Forgot />} />
              <Route path="movie/:id" element={<Title />} />
              <Route path="keyword" element={<Keyword />} />
              <Route path="search" element={<Search />} />
              <Route path="history" element={<History />} />
              <Route path="recommandations" element={<Recommandation />} />
            </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
