import { useEffect, useState } from "react";
import "./MovieDetail.css";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function MovieDetail({ movie, onClose, onWatchlist, isInWatchlist }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const saved = isInWatchlist(movie.imdbID);

  useEffect(() => {
    const fetch_details = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}&plot=full`
        );
        const data = await res.json();
        setDetails(data);
      } catch (e) { console.error(e); }
      setLoading(false);
    };
    fetch_details();

    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [movie.imdbID]);

  const getRatingColor = (r) => {
    const n = parseFloat(r);
    if (n >= 7) return "#4ade80";
    if (n >= 5) return "#ffd700";
    return "#f87171";
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {loading ? (
          <div className="modal-loading">
            <div className="modal-spinner" />
            <p>Loading details...</p>
          </div>
        ) : details ? (
          <div className="modal-inner">
            <div className="modal-left">
              {details.Poster && details.Poster !== "N/A" ? (
                <img className="modal-poster" src={details.Poster} alt={details.Title} />
              ) : (
                <div className="modal-no-poster">🎬</div>
              )}
              {details.imdbRating && details.imdbRating !== "N/A" && (
                <div className="imdb-score" style={{ color: getRatingColor(details.imdbRating) }}>
                  <span className="imdb-label">IMDb</span>
                  <span className="imdb-num">{details.imdbRating}</span>
                  <span className="imdb-denom">/10</span>
                </div>
              )}
            </div>

            <div className="modal-right">
              <div className="modal-tags">
                {details.Type && <span className="m-tag type">{details.Type}</span>}
                {details.Rated && details.Rated !== "N/A" && <span className="m-tag">{details.Rated}</span>}
                {details.Year && <span className="m-tag">{details.Year}</span>}
              </div>

              <h2 className="modal-title">{details.Title}</h2>

              <div className="modal-meta">
                {details.Runtime !== "N/A" && <span>⏱ {details.Runtime}</span>}
                {details.Language !== "N/A" && <span>🌐 {details.Language}</span>}
                {details.Country !== "N/A" && <span>📍 {details.Country}</span>}
              </div>

              {details.Genre !== "N/A" && (
                <div className="genre-list">
                  {details.Genre.split(", ").map((g) => (
                    <span key={g} className="genre-chip">{g}</span>
                  ))}
                </div>
              )}

              {details.Plot !== "N/A" && (
                <p className="modal-plot">{details.Plot}</p>
              )}

              <div className="modal-credits">
                {details.Director !== "N/A" && (
                  <div className="credit-row">
                    <span className="credit-label">Director</span>
                    <span className="credit-val">{details.Director}</span>
                  </div>
                )}
                {details.Writer !== "N/A" && (
                  <div className="credit-row">
                    <span className="credit-label">Writer</span>
                    <span className="credit-val">{details.Writer}</span>
                  </div>
                )}
                {details.Actors !== "N/A" && (
                  <div className="credit-row">
                    <span className="credit-label">Cast</span>
                    <span className="credit-val">{details.Actors}</span>
                  </div>
                )}
                {details.Awards !== "N/A" && (
                  <div className="credit-row awards-row">
                    <span className="credit-label">🏆</span>
                    <span className="credit-val awards-val">{details.Awards}</span>
                  </div>
                )}
              </div>

              {details.Ratings?.length > 0 && (
                <div className="ratings-row">
                  {details.Ratings.map((r) => (
                    <div key={r.Source} className="rating-chip">
                      <span className="r-source">{r.Source.replace("Internet Movie Database","IMDb").replace("Rotten Tomatoes","RT")}</span>
                      <span className="r-val">{r.Value}</span>
                    </div>
                  ))}
                </div>
              )}

              <button
                className={`modal-wl-btn ${saved ? "saved" : ""}`}
                onClick={() => onWatchlist(movie)}
              >
                {saved ? "♥ Remove from Watchlist" : "♡ Add to Watchlist"}
              </button>
            </div>
          </div>
        ) : (
          <p style={{ color: "var(--text2)", padding: "40px", textAlign: "center" }}>
            Failed to load details.
          </p>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
