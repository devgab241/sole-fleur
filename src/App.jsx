import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import ShoeGrid from "./components/ShoeGrid";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

export default function App() {
  const [activeFilter, setActiveFilter] = useState("Tous");

  return (
    <CartProvider>
      <div className="app">
        {/* Animated background blobs */}
        <div className="bg-decoration">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>

        <Navbar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        <main className="main-content">
          {/* Hero */}
          <section className="hero">
            <div className="hero-inner">
              <div className="hero-eyebrow">
                <span className="hero-dot" />
                Nouvelle Collection 2026
              </div>
              <h1 className="hero-title">
                Chaque pas
                <br />
                <em>raconte une histoire</em>
              </h1>
              <p className="hero-sub">
                Explorez notre sélection de chaussures conçues pour les femmes
                qui osent être elles-mêmes. Cliquez sur une paire pour la
                découvrir.
              </p>
            </div>
            <div className="hero-strip">
              {["Mocassins", "Talons", "Ballerines", "Sneakers", "Mules", "Loafers"].map(
                (t, i) => (
                  <span key={i} className="strip-item">
                    {t}
                  </span>
                )
              )}
              {["Mocassins", "Talons", "Ballerines", "Sneakers", "Mules", "Loafers"].map(
                (t, i) => (
                  <span key={`dup-${i}`} className="strip-item" aria-hidden>
                    {t}
                  </span>
                )
              )}
            </div>
          </section>

          <ShoeGrid filter={activeFilter} />
        </main>

        <Footer />
        <Cart />
      </div>
    </CartProvider>
  );
}