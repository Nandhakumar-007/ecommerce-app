import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer"; 
import "../styles/Home.css";
import "../styles/Hero.css";
import "../styles/filters.css";
import "../styles/footer.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products
    .filter((item) =>
      category === "all" ? true : item.category === category
    )
    .filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div>
      <Navbar setSearch={setSearch} />

      <div className="container">
        <Hero />

        <h2 className="section-title">Featured Products</h2>

        <div className="filters">
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All</option>
            <option value="men's clothing">Men</option>
            <option value="women's clothing">Women</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
          </select>

          <select onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>

        {loading ? (
          <h3 className="loading">Loading products...</h3>
        ) : (
          <div className="products">
            {filteredProducts.length === 0 ? (
              <h3>No products found</h3>
            ) : (
              filteredProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))
            )}
          </div>
        )}
      </div>

      <Footer /> 
    </div>
  );
}

export default Home;