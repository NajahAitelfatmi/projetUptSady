import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();
  const apiUrl = "https://projetuptsadya.onrender.com/api"; // Remplacez par votre propre URL API

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, inputs);
      // Si la connexion réussit, stocker le token (par exemple) ou rediriger
      // Par exemple : localStorage.setItem('token', response.data.token);
      navigate("/h"); // redirection après succès
    } catch (err) {
      // Vérification de l'existence de la réponse d'erreur
      const errorMessage = err?.response?.data?.message || "Une erreur s'est produite";
      setError(errorMessage);
    }
  };

  return (
    <div>
      <div className="section page-banner-section" style={{ backgroundImage: 'url(assets/images/bg/page-banner.jpg)' }}>
        <div className="shape-1">
          <img src="assets/images/shape/shape-7.png" alt="" />
        </div>
        <div className="shape-2">
          <img src="assets/images/shape/shape-1.png" alt="" />
        </div>
        <div className="shape-3"></div>
        <div className="container">
          <div className="page-banner-wrap">
            <div className="row">
              <div className="col-lg-12">
                <div className="page-banner text-center">
                  <h2 className="title">Login & Register</h2>
                  <ul className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Login & Register</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section login-register-section section-padding">
        <div className="container">
          <div className="login-register-wrap">
            <div className="row gx-5">
              <div className="col-lg-12">
                <div className="login-register-box" style={{ marginLeft: "300px", marginRight: "300px" }}>
                  <div className="section-title">
                    <h2 className="title" style={{ textAlign: "center" }}>Login</h2>
                  </div>

                  <div className="login-register-form">
                    <form action="#" onSubmit={handleSubmit}>
                      <div className="single-form">
                        <input
                          required
                          type="text"
                          className="form-control"
                          id="username"
                          name="username"
                          placeholder="Username"
                          value={inputs.username}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="single-form">
                        <input
                          required
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          placeholder="Password"
                          value={inputs.password}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-btn">
                        <button type="submit" className="btn">Login</button>
                      </div>

                      {err && <p style={{ color: "red", textAlign: "center" }}>{err}</p>}

                      <span>
                        Don't have an account?<br />
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
    </div>
  );
};

export default Login;
