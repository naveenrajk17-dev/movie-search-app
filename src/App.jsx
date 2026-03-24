import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WatchlistPage from "./pages/WatchlistPage";
import "./App.css";

function App() {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem("cinesearch_watchlist");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const addToWatchlist = (movie) => {
    const updated = [...watchlist, movie];
    setWatchlist(updated);
    localStorage.setItem("cinesearch_watchlist", JSON.stringify(updated));
  };

  const removeFromWatchlist = (id) => {
    const updated = watchlist.filter((m) => m.imdbID !== id);
    setWatchlist(updated);
    localStorage.setItem("cinesearch_watchlist", JSON.stringify(updated));
  };

  const isInWatchlist = (id) => watchlist.some((m) => m.imdbID === id);

  return (
    <Router>
      <div className="app">
        <Navbar watchlistCount={watchlist.length} />
        <Routes>
          <Route path="/" element={
            <Home
              addToWatchlist={addToWatchlist}
              removeFromWatchlist={removeFromWatchlist}
              isInWatchlist={isInWatchlist}
            />
          } />
          <Route path="/watchlist" element={
            <WatchlistPage
              watchlist={watchlist}
              removeFromWatchlist={removeFromWatchlist}
              isInWatchlist={isInWatchlist}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;