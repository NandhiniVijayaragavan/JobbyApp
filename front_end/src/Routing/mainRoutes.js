import { createBrowserRouter, Outlet, RouterProvider,useNavigate } from "react-router-dom";
import React, { useEffect, useContext, useState }  from 'react'
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Navbar from "../Components/Navbar/Navbar";
import Jobs from "../Pages/Jobs";
import CreateJob from "../Pages/CreateJob";

const Layout = () => {
  const navigate = useNavigate();

    return (
      <>
        <div className="fixed_navbar">
            <Navbar/> 
        </div>
        <div className="scrollable_content">
          <Outlet/>
        </div>
      </>
    );
  };
  
  const routes = createBrowserRouter([
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
    
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/jobs",
          element: <Jobs/>,
          children: [
            {
              path: "posted", 
              element: <Jobs category="posted" />,
            },
          ],
        },
        {
          path: "/create_jobs",
          element: <CreateJob/>
        },
      ],
    },
  ]);
  
  export default function MainRoutes() {
    return <RouterProvider router={routes} />;
  }