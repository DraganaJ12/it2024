import axios from "axios";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    city: "",
    country: "",
    phone: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post("http://localhost:8800/api/auth/register", credentials);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <div className="aboutUs">
          <div className="aboutUsContent">
            <div className="lContainer">
              <h2>Register</h2>
              <input
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
                className="lInput"
                required
              />
              <input
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
                className="lInput"
                required
              />
              <input
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
                className="lInput"
                required
              />
              <input
                type="text"
                placeholder="City"
                id="city"
                onChange={handleChange}
                className="lInput"
                required
              />
              <input
                type="text"
                placeholder="Country"
                id="country"
                onChange={handleChange}
                className="lInput"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                id="phone"
                onChange={handleChange}
                className="lInput"
                required
              />
              <button disabled={loading} onClick={handleClick} className="lButton">
                Register
              </button>
              {error && <span>{error.message}</span>}
            </div>
          </div>
          <div className="aboutUsImage"><img src="/3974104.jpg" alt="about us"></img></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
