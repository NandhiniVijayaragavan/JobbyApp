import React ,{useState,  useEffect, useRef} from 'react';
import './navbar.css'; 
import logo from '../../Images/logo.png';
import Profile from '../../Images/Profile.png';
import {Link, useNavigate } from "react-router-dom";
import setAuthToken from '../../Helpers/setAuthToken'

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [userFullName, setUserFullName] = useState("Guest");
  const [userProfilePic, setUserProfilePic] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUserFullName = localStorage.getItem("userFullName");
    const storedUserProfilePic = localStorage.getItem("userProfilePic");
    if (storedUserFullName) {
        setUserFullName(storedUserFullName);
    }
    if (storedUserProfilePic) {
      setUserProfilePic(storedUserProfilePic);
  }
}, []);

useEffect(() => {
  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  }

  window.addEventListener('click', handleClickOutside);

  return () => {
    window.removeEventListener('click', handleClickOutside);
  };
}, []);


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-theme'); 
  };
  const handleProfileClick = () => {
    setShowDropdown(!showDropdown); 
    console.log("indside")
  };

  const handleLogout = () => {
    localStorage.removeItem('authtoken');
    localStorage.removeItem('userFullName');
    localStorage.removeItem('userProfilePic');
    localStorage.removeItem('role');
    localStorage.removeItem('userID');
    setAuthToken(null);
    navigate("/login");
};
  return (
    <nav className={`navbar ${darkMode ? 'dark-theme' : ''}`}>
      <div className="container">
        <div className="logo col-sm-2">
          <img src={logo} alt="Logo" className="jobbylogo" />
        </div>
        <div className="menu col-sm-5">
          <ul className="navbar__nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to ="/jobs">
                Jobs
              </Link>
            </li>
            {localStorage.getItem("role") === "1" ?(
              <li className="nav-item">
              <Link className="nav-link" to ="/create_jobs">
               Create Jobs
              </Link>
            </li>
            ):(<></>)}
          </ul>
        </div>
        <div className="col-sm-2">
          <div className="dark-mode-toggle">
          <span>Dark Mode</span>
            <label className="switch">
              <input type="checkbox" onClick={toggleDarkMode}   />
              <span className="slider round"></span>
            </label>
          </div>
          </div>
            <div className="user-name col-sm-2">
              {userFullName}
            </div>
          <div ref={dropdownRef} className={`user-profile col-sm-1 ${showDropdown ? 'show-dropdown' : ''}`}
            onClick={handleProfileClick}>
            <div className="user-avatar">
              <img src={userProfilePic || Profile} alt="Profile"/>
            </div>
            {localStorage.getItem("role") === "0" ? (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/jobs" className="menu-link">Jobs</Link>
                </li>
                <li>
                  <Link className="menu-link" onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            ) : (
              <ul className="dropdown-menu">
                <li>
                  <Link className="menu-link" to="/create_jobs">Create Jobs</Link>
                </li>
                <li>
                  <Link className="menu-link" to="/jobs">All Jobs</Link>
                </li>
                <li>
                  <Link className="menu-link" to="/jobs/posted">Posted Jobs</Link>
                </li>
                <li>
                  <Link className="menu-link" onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
    </nav>
  );
}

export default Navbar;
