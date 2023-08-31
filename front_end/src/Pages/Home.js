import React,{useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";

function Home() {
  const role = localStorage.getItem('role');
  const isJobSeeker = role === '0';
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authtoken")) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="home-page-container">
        <div className='aniimg'></div>
        <div className="home-content">
          <ul className='home_notes'>
        <li className='items'>
            Jobby App is a well-established, popular platform that attracts
            250 million unique monthly visitors.
          </li>
          <li  className='items'>
            The site features built-in skills assessments to assist with
            candidate screening.
          </li>
          <li  className='items'>
            The platform features an extensive database of over 200 million
            resumes.
          </li>
          <li  className='items'>
            The platform offers free job search.
          </li>
          <li  className='items'>
            Over 30 million Jobs has been posted for different positions.
          </li>
          <li  className='items'>
            With the skill tests a candidate can overview himself/herself.
          </li>
          <li  className='items'>
            Candidate can also apply for the job after checking the skill test results.
          </li>
          <li  className='items'>
            Both Job seekers and Employers can enjoy our Jobby App Services.
          </li>
        </ul>
        <div>
            <Link
              to="/jobs"
              style={{ textDecoration: "none", color: "inherit" }}
            >
               {isJobSeeker && (
              <button
                style={{
                  backgroundColor:"blue",
                  color: "white"
                }}
                className="apply_btn"
              >
                Apply Now
              </button>
               )}
            </Link>
          </div>
        </div>      
    </div>
  );
}

export default Home;