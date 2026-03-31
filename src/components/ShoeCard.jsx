import { useState } from "react";
import { ShoppingBag, RotateCcw, Check, Tag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ShoeCard({ shoe }) {
  const [flipped, setFlipped] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.stopPropagation();
    if (!selectedSize) return;
    addToCart(shoe, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const formatPrice = (p) =>
    new Intl.NumberFormat("fr-FR").format(p) + " FCFA";

  return (
    <div className="shoe-card-wrapper">
      <div
        className={`shoe-card ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped(!flipped)}
      >
        {/* FRONT */}
        <div className="card-face card-front">
          <div className="card-image-wrap">
            <img
              src={shoe.image}
              alt={shoe.name}
              className="card-image"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80";
              }}
            />
            <div className="card-tag">
              <Tag size={10} />
              <span>{shoe.tag}</span>
            </div>
            <div className="card-flip-hint">
              <RotateCcw size={14} />
              <span>Voir détails</span>
            </div>
          </div>
          <div className="card-info">
            <span className="card-category">{shoe.category}</span>
            <h3 className="card-name">{shoe.name}</h3>
            <p className="card-price">{formatPrice(shoe.price)}</p>
          </div>
        </div>

        {/* BACK */}
        <div
          className="card-face card-back"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="back-close"
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(false);
            }}
          >
            <RotateCcw size={14} />
            <span>Retourner</span>
          </button>

          <div className="back-header">
            <h3>{shoe.name}</h3>
            <p className="back-price">{formatPrice(shoe.price)}</p>
          </div>

          <p className="back-description">{shoe.description}</p>

          <div className="size-section">
            <p className="size-label">Choisir votre pointure</p>
            <div className="size-grid">
              {shoe.sizes.map((s) => (
                <button
                  key={s}
                  className={`size-btn ${selectedSize === s ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(s);
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            className={`add-btn ${!selectedSize ? "disabled" : ""} ${added ? "success" : ""}`}
            onClick={handleAdd}
            disabled={!selectedSize}
          >
            {added ? (
              <>
                <Check size={16} />
                Ajouté !
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                {selectedSize
                  ? "Ajouter au panier"
                  : "Sélectionnez une pointure"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}