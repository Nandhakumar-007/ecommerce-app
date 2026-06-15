import { Link } from "react-router-dom";
import "../styles/footer.css"
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LOGO + TAGLINE */}
        <div className="footer-brand">
          <div className="footer-logo">S</div>
          <p className="footer-tagline">ShopZone — Your one stop shop for everything.</p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>

        {/* CONTACT */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>📧 nandhakumarvenkatesan007@gmail.com</p>
          <p>📞 9176677565</p>
          <p>📍chennai, Tamil Nadu, India</p>
        </div>

        {/* SOCIAL */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#" aria-label="Instagram">📸 Instagram</a>
            <a href="#" aria-label="Twitter">🐦 Twitter</a>
            <a href="#" aria-label="Facebook">📘 Facebook</a>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ShopZone. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;