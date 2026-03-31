import { Heart, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">Solé Fleur</span>
          <p>Des chaussures pensées pour vous, livrées avec amour.</p>
        </div>
        <div className="footer-links">
          <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
          <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
        </div>
      </div>
      <div className="footer-copy">
        <span>© 2026 Solé Fleur — Fait avec</span>
        <Heart size={12} fill="currentColor" />
        <span>et du style</span>
      </div>
    </footer>
  );
}