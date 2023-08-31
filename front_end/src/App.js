import './App.css';
import React, {useState}  from 'react'
import MainRoutes from './Routing/mainRoutes'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <MainRoutes/>
      <ToastContainer/>
    </>
  );
}

export default App;
