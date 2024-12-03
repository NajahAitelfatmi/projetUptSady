import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext"; // Assuming you have an AuthContext

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://projetuptsadya.onrender.comm/auth/login", inputs);
      
      // Assuming the response contains a JWT token
      const { token, user } = response.data;

      // Save the JWT token to localStorage
      localStorage.setItem("token", token);
      
      // You can also store the user data if needed
      localStorage.setItem("user", JSON.stringify(user));
      
      // Use context or state to manage login status globally (if using context)
      login(user);

      // Redirect user after successful login
      navigate("/home");  // Redirect to a page after login

    } catch (error) {
      // Handle error (show error message)
      setError(error.response ? error.response.data.message : "An error occurred");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div className="section page-banner-section" style={{ backgroundImage: 'url(assets/images/bg/page-banner.jpg)' }}>
        <div className="container">
          <div className="page-banner-wrap">
            <h2 className="title">Login</h2>
          </div>
        </div>
      </div>

      <div className="section login-register-section section-padding">
        <div className="container">
          <div className="login-register-wrap">
            <div className="col-lg-12">
              <div className="login-register-box" style={{ marginLeft: "300px", marginRight: "300px" }}>
                <div className="section-title">
                  <h2 className="title">Login</h2>
                </div>

                <div className="login-register-form">
                  <form onSubmit={handleSubmit}>
                    <div className="single-form">
                      <input
                        required
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="Username or email"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="single-form">
                      <input
                        required
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-btn">
                      <button type="submit" className="btn">Login</button>
                    </div>

                    {err && <p>{err}</p>}
                    <span>
                      Don't have an account? <br />
                      <Link to="/register">Register</Link>
                    </span>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
