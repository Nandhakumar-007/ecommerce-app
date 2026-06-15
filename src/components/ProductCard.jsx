import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/product.css";

function ProductCard({ product }) {
  const { cart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const isAdded = cart.some((item) => item.id === product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className={`card ${isAdded ? "added-card" : ""}`}
      onClick={handleCardClick} // clicking card opens details
    >
      <img src={product.image} alt={product.title} />

      <h3>{product.title}</h3>

      <p className="price">₹{product.price}</p>

      <button
        className={isAdded ? "added-btn" : ""}
        onClick={(e) => {
          e.stopPropagation(); // prevents card click when clicking button
          addToCart(product);
        }}
      >
        {isAdded ? "Added" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;