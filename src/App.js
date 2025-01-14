import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import List from "./Pages/list";
import SignUp from "./Pages/signup";
import SignIn from "./Pages/signin";
import Search from "./Pages/search";
import Home from "./Pages/home";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "./Pages/forgot";
import PublicRoute from "./PublicRoute";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-list"
              element={
                <ProtectedRoute>
                  <List />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <PublicRoute>
                  <SignIn />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
