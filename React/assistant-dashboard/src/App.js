import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Components from './Components/Components';
import Register from './Components/Auths/Register';
import Login from './Components/Auths/Login';
import Profiles from "./Components/Auths/Profiles";

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profiles />} />
        <Route path='/*' element={<Components />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
