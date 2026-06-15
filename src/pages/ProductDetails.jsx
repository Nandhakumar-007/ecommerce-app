import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import "../styles/ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAdded = cart.some((item) => item.id === product?.id);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div>
      <Navbar />
      <h3 className="pd-loading">Loading product...</h3>
    </div>
  );

  if (!product) return (
    <div>
      <Navbar />
      <h3 className="pd-loading">Product not found</h3>
    </div>
  );

  // render stars based on rating
  const renderStars = (rate) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.round(rate) ? "star filled" : "star"}>
        &#9733;
      </span>
    ));
  };

  return (
    <div>
      <Navbar />

      <div className="pd-container">

        {/* BACK BUTTON */}
        <button className="pd-back" onClick={() => navigate(-1)}>
          &larr; Back
        </button>

        <div className="pd-card">

          {/* IMAGE */}
          <div className="pd-image-box">
            <img src={product.image} alt={product.title} />
          </div>

          {/* DETAILS */}
          <div className="pd-info">

            {/* CATEGORY */}
            <span className="pd-category">{product.category}</span>

            {/* TITLE */}
            <h2 className="pd-title">{product.title}</h2>

            {/* RATING */}
            <div className="pd-rating">
              <div className="stars">{renderStars(product.rating.rate)}</div>
              <span className="pd-rating-text">
                {product.rating.rate} / 5 ({product.rating.count} reviews)
              </span>
            </div>

            {/* PRICE */}
            <p className="pd-price">₹{product.price}</p>

            {/* DESCRIPTION */}
            <p className="pd-description">{product.description}</p>

            {/* ADD TO CART */}
            <button
              className={`pd-btn ${isAdded ? "pd-btn-added" : ""}`}
              onClick={() => addToCart(product)}
            >
              {isAdded ? "Added to Cart" : "Add to Cart"}
            </button>

            {/* GO TO CART */}
            {isAdded && (
              <button className="pd-cart-btn" onClick={() => navigate("/cart")}>
                Go to Cart
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;