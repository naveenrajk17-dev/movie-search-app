import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  const suggestions = ["Inception", "Interstellar", "The Dark Knight", "Avengers", "Dune"];

  return (
    <div className="searchbar-wrap">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-box">
          <span className="s-icon">🔍</span>
          <input
            type="text"
            className="s-input"
            placeholder="Search any movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" className="s-btn" disabled={loading}>
            {loading ? <span className="s-spinner" /> : "Search"}
          </button>
        </div>
      </form>
      <div className="suggestions">
        <span className="sug-label">Try:</span>
        {suggestions.map((s) => (
          <button key={s} className="sug-chip" onClick={() => { setQuery(s); onSearch(s); }}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
