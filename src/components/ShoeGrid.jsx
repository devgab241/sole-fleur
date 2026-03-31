import { useMemo } from "react";
import ShoeCard from "./ShoeCard";
import { shoes as allShoes } from "../data/shoes";

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function ShoeGrid({ filter }) {
  // Shuffle once per mount (random at each page load)
  const shuffled = useMemo(() => shuffle(allShoes), []);

  const displayed =
    filter === "Tous"
      ? shuffled
      : shuffled.filter((s) => s.category === filter);

  return (
    <section className="shoe-grid-section">
      <div className="shoe-grid">
        {displayed.map((shoe, i) => (
          <div
            key={shoe.id}
            className="shoe-grid-item"
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <ShoeCard shoe={shoe} />
          </div>
        ))}
      </div>
    </section>
  );
}