import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';

import AuthProvider from "./components/context/auth";

import NavBar from "./components/navBar/navBar";
import HomePage from "./components/homePage/homePage";
import Register from "./components/register/register";
import Login from "./components/login/login";
import UserProfile from "./components/userProfile/userProfile";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div>
              <NavBar />
              <HomePage />
            </div>
          } />
          <Route path="/register" element={
            <div>
              <NavBar />
              <Register />
            </div>
          } />
          <Route path="/login" element={
            <div>
              <NavBar />
              <Login />
            </div>
          } />
          <Route path="/profile" element={
            <div>
              <NavBar />
              <UserProfile />
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
