import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';


const Navbar = () => {
  const { user } = useContext(AuthContext);

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      //zahtjev na server za čišćenje sesije/kolačića
      await axios.post('http://localhost:8800/api/auth/logout');

      // Ažurirajte stanje pomoću dispatch funkcije
      dispatch({ type: "LOGOUT" });

      alert('Logged out successfully!');
      navigate('/'); // Preusmjeravanje korisnika na pocetnu stranicu
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out!');
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo"><h2>LearnNow</h2></span>
        </Link>
        {user ?
          <div className="navItems">
            <Link to="/profile"><button  className="navButton">{user.username}</button></Link>
            <button className="navButton" onClick={handleLogout} >Logout</button>
          </div>
          : (
            <div className="navItems">
              <Link to="/register"><button  className="navButton">Register</button></Link>
              <Link to="/login"><button  className="navButton">Login</button></Link>

            </div>
          )}
      </div>
    </div>
  );
};

export default Navbar;