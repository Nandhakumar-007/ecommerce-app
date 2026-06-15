import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password) return;
    navigate("/login");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <div className="logo">S</div>

        <h2>Create Account</h2>
        <p className="subtitle">Join ShopZone today</p>

        <div className="toggle">
          <Link to="/login">Login</Link>
          <button className="active">Sign Up</button>
        </div>

        <label>Full Name</label>
        <input name="name" placeholder="John Doe" onChange={handleChange} />

        <label>Email Address</label>
        <input name="email" placeholder="you@example.com" onChange={handleChange} />

        <label>Password</label>
        <input type="password" name="password" placeholder="••••••••" onChange={handleChange} />

        <button className="main-btn" onClick={handleSubmit}>
          Create Account →
        </button>

      </div>
    </div>
  );
}

export default Signup;