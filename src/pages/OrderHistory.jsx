import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/OrderHistory.css";

function OrderHistory() {
  const navigate = useNavigate();
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const paymentLabel = (method) => {
    if (method === "cod") return "Cash on Delivery";
    if (method === "upi") return "UPI";
    if (method === "card") return "Credit / Debit Card";
    return method;
  };

  return (
    <div>
      <Navbar />

      <div className="oh-container">
        <h2 className="oh-title">Order History</h2>

        {orders.length === 0 ? (
          <div className="oh-empty">
            <p>No orders placed yet.</p>
            <button className="oh-shop-btn" onClick={() => navigate("/")}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="oh-list">
            {orders.map((order) => (
              <div className="oh-card" key={order.id}>

                {/* ORDER HEADER */}
                <div className="oh-header">
                  <div>
                    <p className="oh-date">Ordered on: {order.date}</p>
                    <p className="oh-payment">Payment: {paymentLabel(order.payment)}</p>
                  </div>
                  <div className="oh-total">
                    Total: ₹{order.total}
                  </div>
                </div>

                {/* ORDER ITEMS */}
                <div className="oh-items">
                  {order.items.map((item) => (
                    <div className="oh-item" key={item.id}>
                      <img src={item.image} alt={item.title} />
                      <div className="oh-item-info">
                        <p className="oh-item-title">{item.title}</p>
                        <p className="oh-item-qty">Qty: {item.qty}</p>
                        <p className="oh-item-price">₹{item.price * item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* DELIVERY ADDRESS */}
                <div className="oh-address">
                  <p className="oh-address-label">Delivered to:</p>
                  <p>{order.address.name}, {order.address.phone}</p>
                  <p>{order.address.address}, {order.address.city} - {order.address.pincode}</p>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;