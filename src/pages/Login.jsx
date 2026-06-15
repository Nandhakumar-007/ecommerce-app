import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../styles/auth.css";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  //Redirect back to where they came from, default to "/"
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.email || !form.password) return;
    login(form.email);

    //Goes back to /cart if they were redirected from cart
    navigate(from, { replace: true });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        {/* LOGO */}
        <div className="logo">S</div>

        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to your ShopZone account</p>

        {/* TOGGLE */}
        <div className="toggle">
          <button className="active">Login</button>
          <Link to="/signup">Sign Up</Link>
        </div>

        {/* FORM */}
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          onChange={handleChange}
        />

        <div className="forgot">Forgot password?</div>

        <button className="main-btn" onClick={handleSubmit}>
          Login →
        </button>

      </div>
    </div>
  );
}

export default Login;