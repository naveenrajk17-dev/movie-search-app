import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import MovieCard from "../components/MovieCard";
import MovieDetail from "../components/MovieDetail";
import "./Home.css";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const DEFAULT_SEARCHES = ["Marvel", "Batman", "Star Wars", "Harry Potter", "James Bond"];

function Home({ addToWatchlist, removeFromWatchlist, isInWatchlist }) {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("All Years");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searched, setSearched] = useState(false);

  const buildUrl = (q, pg) => {
    let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(q)}&page=${pg}`;
    if (type) url += `&type=${type}`;
    if (year !== "All Years") url += `&y=${year}`;
    return url;
  };

  const handleSearch = async (q, pg = 1) => {
    setLoading(true);
    setError("");
    setQuery(q);
    setSearched(true);
    if (pg === 1) { setMovies([]); setPage(1); }

    try {
      const res = await fetch(buildUrl(q, pg));
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(pg === 1 ? data.Search : (prev) => [...prev, ...data.Search]);
        setTotalResults(parseInt(data.totalResults));
      } else {
        setError(data.Error || "No movies found.");
        setMovies([]);
      }
    } catch {
      setError("Network error. Please check your connection.");
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    const next = page + 1;
    setPage(next);
    handleSearch(query, next);
  };

  const handleWatchlist = (movie) => {
    if (isInWatchlist(movie.imdbID)) removeFromWatchlist(movie.imdbID);
    else addToWatchlist(movie);
  };

  const hasMore = movies.length < totalResults;

  return (
    <div className="home">
      <div className="scene-bg"><div className="grid-lines" /></div>

      <div className="hero">
        <div className="hero-badge">✦ Movie Universe</div>
        <h1 className="hero-title">
          Discover <span className="title-accent">Cinematic</span><br />Masterpieces
        </h1>
        <p className="hero-sub">Search from millions of movies, series & episodes</p>
        <SearchBar onSearch={(q) => handleSearch(q, 1)} loading={loading} />
        <div className="filters-wrap">
          <Filters type={type} year={year} onTypeChange={setType} onYearChange={setYear} />
        </div>
      </div>

      <div className="results-wrap">
        {!searched ? (
          <div className="discover-section">
            <p className="discover-label">✦ Popular Searches</p>
            <div className="discover-grid">
              {DEFAULT_SEARCHES.map((s) => (
                <button key={s} className="discover-btn" onClick={() => handleSearch(s, 1)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="results-header">
              <h2 className="results-title">
                {error ? "No Results" : `Results for "${query}"`}
              </h2>
              {totalResults > 0 && (
                <span className="results-count">{totalResults} titles found</span>
              )}
            </div>

            {error ? (
              <div className="error-state">
                <span className="error-icon">🎬</span>
                <p>{error}</p>
              </div>
            ) : loading && movies.length === 0 ? (
              <div className="skeleton-grid">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="skeleton" style={{ animationDelay: `${i * 0.05}s` }} />
                ))}
              </div>
            ) : (
              <>
                <div className="movie-grid">
                  {movies.map((movie, i) => (
                    <div key={movie.imdbID} style={{ animationDelay: `${(i % 8) * 0.06}s` }}>
                      <MovieCard
                        movie={movie}
                        onSelect={setSelectedMovie}
                        onWatchlist={handleWatchlist}
                        isInWatchlist={isInWatchlist}
                      />
                    </div>
                  ))}
                </div>

                {hasMore && !loading && (
                  <div className="load-more">
                    <button className="load-more-btn" onClick={handleLoadMore}>
                      Load More <span className="lm-count">({movies.length}/{totalResults})</span>
                    </button>
                  </div>
                )}

                {loading && movies.length > 0 && (
                  <div className="loading-more">
                    <div className="dot-loader">
                      <span /><span /><span />
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onWatchlist={handleWatchlist}
          isInWatchlist={isInWatchlist}
        />
      )}
    </div>
  );
}

export default Home;
