import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/OrderSuccess.css";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      <div className="success-container">
        <div className="success-card">

          {/* ICON */}
          <div className="success-icon">&#10003;</div>

          <h2 className="success-title">Order Placed Successfully!</h2>
          <p className="success-msg">
            Thank you for shopping with ShopZone. Your order is confirmed and will be delivered soon.
          </p>

          <div className="success-actions">
            <button className="success-home-btn" onClick={() => navigate("/")}>
              Continue Shopping
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;