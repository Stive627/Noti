import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ProtectedRoutes from "./Components/ProtectedRoutes";
import HomePage from "./Pages/HomePage";
import { ProviderTheme } from "./useHook/useContextTheme";
import SingUpPage from "./Pages/SingUpPage";
import LoginPage from "./Pages/LoginPage";
import Profile from "./Components/Profile";

function App() {
  return (
    <ProviderTheme >
      <Router>
        <Routes>
        <Route element={<ProtectedRoutes/>}/>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />   
        <Route/>
        <Route  path="/signup" element={<SingUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </Router>
    </ProviderTheme>
  );
}

export default App;
