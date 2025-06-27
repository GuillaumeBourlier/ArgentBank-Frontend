import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import NavBar from "./components/Navbar/NavBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import SignInPage from "./pages/SignInPage";
import UserPage from "./pages/UserPage";
import Error from "./pages/Error.jsx";
import SecurePage from "./components/SecureRoute/SecureRoute.jsx";
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignInPage />} />
            <Route path="/profile" element={<SecurePage><UserPage  /></SecurePage>} /> 
            <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
