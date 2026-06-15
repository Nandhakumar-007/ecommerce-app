import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Cart.css";

function Cart() {
  const { cart, removeFromCart, updateQty } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBuy = () => {
    if (!user) {
      navigate("/login", {
        state: { from: { pathname: "/cart" } },
      });
      return;
    }
    navigate("/checkout"); // goes to checkout page
  };

  return (
    <div>
      <Navbar />

      <div className="cart-container">
        <h2 className="cart-title">Your Cart</h2>

        {!cart || cart.length === 0 ? (
          <p className="empty">Cart is empty</p>
        ) : (
          <>
            <div className="cart-list">
              {cart.map((item) => (
                <div className="cart-item selected" key={item.id}>
                  <span className="badge">Added</span>

                  <img src={item.image} alt={item.title} />

                  <div className="cart-details">
                    <h4>{item.title}</h4>
                    <p>₹{item.price}</p>

                    <div className="qty-controls">
                      <button onClick={() => updateQty(item.id, "dec")}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, "inc")}>+</button>
                    </div>

                    <p className="item-total">
                      Total: ₹{item.price * item.qty}
                    </p>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button className="buy-btn" onClick={handleBuy}>
                Buy Now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;