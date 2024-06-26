import axios from "axios";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response });
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
              <h2>Prijava</h2>
              <input
                type="text"
                placeholder="username"
                id="username"
                onChange={handleChange}
                className="lInput"
              />
              <input
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
                className="lInput"
              />
              <button disabled={loading} onClick={handleClick} className="lButton">
                Uloguj se
              </button>
              {error && <span>{error.message}</span>}
            </div>
          </div>
          <div className="aboutUsImage"><img src="/3974104.jpg"></img></div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;