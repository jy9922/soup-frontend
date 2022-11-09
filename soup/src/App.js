// import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage'; 
import LoginPage from './components/views/LoginPage/LoginPage';
import JoinPage from './components/views/JoinPage/JoinPage';
import ConfirmPw from './components/views/UserPage/ConfirmPw';
import EditUserInfo  from './components/views/UserPage/EditUserInfo';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/join" element={<JoinPage />} />
          <Route exact path="/confirmPw" element={<ConfirmPw />} />
          <Route exact path="/editUserInfo" element={<EditUserInfo />} />
          
          {/* <Route exact path="*" element={<NotFound />} */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
