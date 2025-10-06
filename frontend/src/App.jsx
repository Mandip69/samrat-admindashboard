import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/signup';
// import Dashboard from './pages/Dashboard';
import UploadPage from './pages/UploadPage';
import MediaList from './pages/MediaList';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} /> */}
      <Route path="/upload" element={<PrivateRoute><UploadPage/></PrivateRoute>} />
      <Route path="/media" element={<PrivateRoute><MediaList/></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
