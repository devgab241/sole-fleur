import { ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";

const categories = [
  "Tous",
  "Classique",
  "Soirée",
  "Quotidien",
  "Sport",
  "Hybride",
  "Décontracté",
  "Luxe Sport",
  "Tendance",
  "Romantique",
];

export default function Navbar({ activeFilter, setActiveFilter }) {
  const { count, setIsCartOpen } = useCart();

  return (
    <header className="navbar">
      <div className="navbar-top">
        <div className="navbar-brand">
          <div className="brand-logo">
            <img
              src="/logo.png"
              alt="Solé Fleur"
              className="logo-img"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className="logo-fallback" style={{ display: "none" }}>
              <Sparkles size={28} />
            </div>
          </div>
          <div className="brand-text">
            <span className="brand-name">Solé Fleur</span>
            <span className="brand-tagline">La chaussure qui vous ressemble</span>
          </div>
        </div>

        <button
          className="cart-trigger"
          onClick={() => setIsCartOpen(true)}
          aria-label="Ouvrir le panier"
        >
          <ShoppingBag size={22} />
          {count > 0 && <span className="cart-badge">{count}</span>}
        </button>
      </div>

      <nav className="navbar-filters">
        <div className="filters-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}