import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthHook from "../../auth/AuthHook";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get auth info from AuthHook
  const session = AuthHook();

  useEffect(() => setActiveLink(location.pathname), [location.pathname]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout now!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout now!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userInfo");
        Swal.fire(
          "Logout Successfully",
          "You have been logged out!",
          "success"
        ).then(() => {
          navigate("/login");
        });
      }
    });
  };

  const handleNavigation = (link) => {
    setActiveLink(link);
    navigate(link);
    setMenuOpen(false);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        session ? "nav-bg-white" : "nav-bg-transparent"
      }`}
    >
      <div className="container">
        <div className="navbar-brand">TereSang</div>
        <button
          className="navbar-toggler"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <GiHamburgerMenu className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            {!session ? (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${activeLink === "/" ? "active" : ""}`}
                    to="/"
                    onClick={() => handleNavigation("/")}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      activeLink === "/login" ? "active" : ""
                    }`}
                    to="/login"
                    onClick={() => handleNavigation("/login")}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      activeLink === "/register" ? "active" : ""
                    }`}
                    to="/register"
                    onClick={() => handleNavigation("/register")}
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeLink === "/profile" ? "active" : ""
                    }`}
                    onClick={() => handleNavigation(`/all-details/${session.mobileNumber}`)}
                  >
                    My Profile
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeLink === "/profiles" ? "active" : ""
                    }`}
                    onClick={() => handleNavigation("/profiles")}
                  >
                    Dashboard
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeLink === "/change-password" ? "active" : ""
                    }`}
                    onClick={() => handleNavigation("/change-password")}
                  >
                    Change Password
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
