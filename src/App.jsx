
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import NavbarComp from "./components/NavbarComp";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./components/Profile";
import CreateService from "./pages/CreateService";

import "./App.css";
/*
import NotFound from "./components/NotFound";
import Service from "./pages/Service";
*/

import { UserContext } from "./context/UserContext";

function App() {
  
  const { token } = useContext(UserContext);

  return (
    <div className="layout">
      <NavbarComp />

      <div className="content">
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/gallery" element={<Gallery />} />
            <Route
              path="/login"
              element={token ? <Navigate to="/profile" /> : <Login />}
            />
             <Route
              path="/register"
              element={token ? <Navigate to="/" /> : <Register />}
            />
            <Route
              path="/profile"
              element={token ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/create-service"
              element={token ? <CreateService /> : <Navigate to="/login" />}
            />
        </Routes>
      </div>
    <Footer />
    </div>
) };
        
/* 
      
      
        <Route path="/service/:id" element={<Service />} />

        <Route path="*" element={<NotFound />} />
  */
      


export default App;
