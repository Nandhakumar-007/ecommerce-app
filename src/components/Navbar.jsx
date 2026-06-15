import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/navbar.css";

function Navbar({ setSearch }) {
  const [text, setText] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setText(value);
    if (setSearch) setSearch(value);
  };

  return (
    <div className="navbar">

      {/* Logo links back to home */}
      <Link to="/" className="navbar-logo">ShopZone</Link>

      <input
        placeholder="Search products..."
        value={text}
        onChange={handleSearch}
      />

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Navbar;