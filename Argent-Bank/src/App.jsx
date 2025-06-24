import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import SignInPage from "./pages/SignInPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignInPage />} />
            <Route path="/profile" element={<UserPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
