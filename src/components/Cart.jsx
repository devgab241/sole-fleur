import { X, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "../context/CartContext";

const WHATSAPP_NUMBER = "21654109657"; 

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQty,
    total,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const formatPrice = (p) =>
    new Intl.NumberFormat("fr-FR").format(p) + " FCFA";

  const handleOrder = () => {
    if (cartItems.length === 0) return;

    const lines = cartItems.map(
      (item) =>
        `• ${item.name} (Pointure ${item.size}) x${item.qty} — ${formatPrice(item.price * item.qty)}`
    );

    const message = [
      "Bonjour, je souhaite passer une commande sur *Solé Fleur* 🌸",
      "",
      "*Mes articles :*",
      ...lines,
      "",
      `*Total à payer : ${formatPrice(total)}*`,
      "",
      "Merci de confirmer ma commande !",
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
      <aside className="cart-drawer">
        <div className="cart-header">
          <h2>Mon Panier</h2>
          <button
            className="cart-close"
            onClick={() => setIsCartOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <p>Votre panier est vide</p>
            <span>Cliquez sur une chaussure pour commencer !</span>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="cart-item">
                  <div className="cart-item-img">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80";
                      }}
                    />
                  </div>
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <span className="cart-item-size">Pointure {item.size}</span>
                    <p className="cart-item-price">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="qty-control">
                      <button onClick={() => updateQty(item.id, item.size, -1)}>
                        <Minus size={12} />
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.size, 1)}>
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id, item.size)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <button className="order-btn" onClick={handleOrder}>
                <MessageCircle size={18} />
                Commander via WhatsApp
              </button>
              <p className="cart-note">
                Vous serez redirigé vers WhatsApp avec le récapitulatif de votre commande.
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}