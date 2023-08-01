import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Filelist from './components/Filelist';
import AccessControl from './components/AccessControl';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/filelist' element={<Filelist />} />
      <Route path='/access' element={<AccessControl />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;