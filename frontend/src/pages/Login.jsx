import "../styles/login.css";
import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";


function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");

      console.log("Token saved successfully");

    } catch (error) {
      console.error(error);
    }
  };





  return (
    <div className="login-page">
      <div className="login-card">
        <div className="row g-0 h-100">

          <div className="col-lg-6 d-none d-lg-flex login-left">
            <div className="login-left-content">

              <div className="brand-logo">
                <i className="bi bi-whatsapp"></i>
              </div>

              <h1>WhatsApp CRM</h1>

              <p>
                Manage leads, conversations, campaigns and your team
                from one powerful dashboard.
              </p>

              <div className="feature-list">
                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  Lead Management
                </div>

                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  WhatsApp Campaigns
                </div>

                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  Analytics Dashboard
                </div>
              </div>

            </div>
          </div>

          {/*--------------------------- Right Panel ---------------------------*/}
          <div className="col-lg-6 bg-white">
            <div className="d-flex flex-column justify-content-center h-100 p-5">

              <div className="text-center mb-4">
                <div className="login-icon mx-auto mb-3">
                  <i className="bi bi-box-arrow-in-right"></i>
                </div>

                <h2 className="fw-bold">Welcome Back</h2>

                <p className="text-muted">
                  Sign in to continue to your dashboard
                </p>
              </div>
              {/*---------------------------FORM-----------------------------*/}
              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control login-input"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label fw-semibold">
                    Password
                  </label>

                  <div className="input-group">

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control login-input border-end-0"
                      placeholder="Enter your password"
                    />

                    <span className="input-group-text bg-white border-start-0">
                      <i className="bi bi-eye"></i>
                    </span>

                  </div>
                </div>

                <div className="text-end mb-4">
                  <a
                    href="#"
                    className="text-success text-decoration-none"
                  >
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="btn login-btn w-100"
                >
                  Login
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;