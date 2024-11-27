import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div>
      <div className="section header">
        <div className="header-bottom-section">
          <div className="container-fluid custom-container">
            <div className="header-bottom-wrap">
              <div className="header-logo-menu">
                <div className="header-logo">
                  <Link to="/h"><img src="assets/images/logo.png" alt="logo" /></Link>
                </div>

                <div className="header-menu d-none d-lg-block">
                  <ul className="main-menu">
                    <li className="active-menu">
                      <Link to="/h/?cat=art">Art</Link>
                    </li>
                    <li><Link to="/h/?cat=science">Science</Link></li>
                    <li><Link to="/h/?cat=technology">Technology</Link></li>
                    <li><Link to="/h/?cat=cinema">Cinema</Link></li>
                    <li><Link to="/h/?cat=design">Design</Link></li>
                    <li><Link to="/h/?cat=food">Food</Link></li>
                  </ul>
                </div>
              </div>

              <div className="header-login d-none d-lg-block">
                <span style={{ marginRight: "100px" }}>{currentUser?.username}</span>
                {currentUser ? (
                  <Link onClick={logout} style={{ marginRight: "100px" }}>Logout</Link>
                ) : (
                  <Link className="link" to="/login" style={{ marginRight: "100px" }}>
                    <i className="far fa-user"></i> Login
                  </Link>
                )}
                
                {/* Affiche le lien "Write" seulement si l'utilisateur est connecté */}
                {currentUser && (
                  <span className="write" style={{ marginRight: "100px" }}>
                    <Link className="link" to="/write">
                      Add
                    </Link>
                  </span>
                )}
              </div>

              <div className="header-toggle d-lg-none">
                <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
