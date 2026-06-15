import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/checkout.css";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [payment, setPayment] = useState("cod");

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.qty, 0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    const { name, phone, address, city, pincode } = form;
    if (!name || !phone || !address || !city || !pincode) {
      alert("Please fill all fields");
      return;
    }

    // save order to localStorage
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cart,
      total: totalPrice.toFixed(2),
      payment,
      address: { name, phone, address, city, pincode },
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([newOrder, ...existingOrders]));

    clearCart();
    navigate("/order-success");
  };

  return (
    <div>
      <Navbar />

      <div className="checkout-container">
        <h2 className="checkout-title">Checkout</h2>

        <div className="checkout-grid">

          {/* LEFT - ADDRESS + PAYMENT */}
          <div className="checkout-left">

            {/* ADDRESS FORM */}
            <div className="checkout-section">
              <h3>Delivery Address</h3>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  name="name"
                  placeholder="Nandhakumar"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  name="phone"
                  placeholder="+91**********"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  placeholder="House No, Street, Area"
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    name="city"
                    placeholder="Chennai"
                    value={form.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Pincode</label>
                  <input
                    name="pincode"
                    placeholder="600126"
                    value={form.pincode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT OPTIONS */}
            <div className="checkout-section">
              <h3>Payment Method</h3>

              <div className="payment-options">

                <label className={`payment-card ${payment === "cod" ? "selected-payment" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={payment === "cod"}
                    onChange={() => setPayment("cod")}
                  />
                  <span>Cash on Delivery</span>
                </label>

                <label className={`payment-card ${payment === "upi" ? "selected-payment" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={payment === "upi"}
                    onChange={() => setPayment("upi")}
                  />
                  <span>UPI</span>
                </label>

                <label className={`payment-card ${payment === "card" ? "selected-payment" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={payment === "card"}
                    onChange={() => setPayment("card")}
                  />
                  <span>Credit / Debit Card</span>
                </label>

              </div>
            </div>
          </div>

          {/* RIGHT - ORDER SUMMARY */}
          <div className="checkout-right">
            <div className="checkout-section">
              <h3>Order Summary</h3>

              <div className="summary-list">
                {cart.map((item) => (
                  <div className="summary-item" key={item.id}>
                    <img src={item.image} alt={item.title} />
                    <div className="summary-info">
                      <p className="summary-title">{item.title}</p>
                      <p className="summary-qty">Qty: {item.qty}</p>
                      <p className="summary-price">₹{item.price * item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery</span>
                  <span className="free">FREE</span>
                </div>
                <div className="summary-row total-row">
                  <span>Total Amount</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button className="place-order-btn" onClick={handleOrder}>
                Place Order
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;