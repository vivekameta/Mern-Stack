import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {

  const userRole = sessionStorage.getItem("userRole");
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.clear();
    navigate("/");
  }
  
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg ">
        <Link className="navbar-brand" to="/home">
          <img
            src="https://c8.alamy.com/comp/2H59GHB/colorful-creative-education-icon-concept-flat-vector-illustration-colorful-study-icon-vector-illustration-2H59GHB.jpg"
            alt="Logo"
            width="40"
            height="40"
          />
          <span className="ms-2 fw-bold">ONLINE LEARNING</span>
        </Link>
        <div className="collapse navbar-collapse">
        
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">

       
              <li className="nav-item ms-3">
              <Link className="nav-link" to="/courses" id="coursesDropdown">
                Courses
              </Link>
            </li>
            
            
            {
              userRole == "student" && (
                <>
                 <li className="nav-item dropdown">
                  <Link
                    className="nav-link"
                    to="/enroll"
                    id="resourcesDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                  Enroll Courses
                  </Link>
                </li>
                </>
              )
            }
            {userRole == "teacher" && (
              <>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link"
                    to="/mycourses"
                    id="resourcesDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    My Courses
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <a className="nav-link" href="#">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Services
              </a>
            </li>
           
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <li>
                <a className="btn btn-danger" onClick={handleLogout}>Log Out</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
