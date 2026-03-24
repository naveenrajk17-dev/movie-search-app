import { useState } from "react";
import MovieCard from "../components/MovieCard";
import MovieDetail from "../components/MovieDetail";
import "./WatchlistPage.css";

function WatchlistPage({ watchlist, removeFromWatchlist, isInWatchlist }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="wl-page">
      <div className="scene-bg"><div className="grid-lines" /></div>
      <div className="wl-header">
        <div className="wl-title-row">
          <h1 className="wl-title">My <span className="wl-accent">Watchlist</span></h1>
          <span className="wl-count">{watchlist.length} saved</span>
        </div>
        <p className="wl-sub">Movies & series you want to watch</p>
      </div>

      {watchlist.length === 0 ? (
        <div className="wl-empty">
          <div className="empty-circle">
            <span>♡</span>
          </div>
          <h3>Nothing saved yet</h3>
          <p>Search for movies and hit Save to add them here</p>
          <a href="/" className="go-search-btn">Start Searching →</a>
        </div>
      ) : (
        <div className="wl-grid-wrap">
          <div className="wl-grid">
            {watchlist.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onSelect={setSelectedMovie}
                onWatchlist={() => removeFromWatchlist(movie.imdbID)}
                isInWatchlist={isInWatchlist}
              />
            ))}
          </div>
        </div>
      )}

      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onWatchlist={() => removeFromWatchlist(selectedMovie.imdbID)}
          isInWatchlist={isInWatchlist}
        />
      )}
    </div>
  );
}

export default WatchlistPage;
