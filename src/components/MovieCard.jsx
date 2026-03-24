import { useRef } from "react";
import "./MovieCard.css";

function MovieCard({ movie, onSelect, onWatchlist, isInWatchlist }) {
  const saved = isInWatchlist(movie.imdbID);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotY = ((x - cx) / cx) * 8;
    const rotX = -((y - cy) / cy) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    card.style.boxShadow = `${-rotY}px ${rotX}px 30px rgba(0,0,0,0.5), 0 0 20px rgba(230,57,70,0.1)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "";
    card.style.boxShadow = "";
  };

  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <div
      className="movie-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(movie)}
    >
      <div className="card-poster">
        {hasPoster ? (
          <img src={movie.Poster} alt={movie.Title} loading="lazy" />
        ) : (
          <div className="no-poster">
            <span>🎬</span>
            <p>{movie.Title}</p>
          </div>
        )}
        <div className="card-shine" />
        <div className="card-overlay">
          <button className="view-btn">View Details</button>
        </div>
        <div className="card-type-badge">{movie.Type || "movie"}</div>
      </div>
      <div className="card-info">
        <p className="card-title">{movie.Title}</p>
        <p className="card-year">{movie.Year}</p>
        <button
          className={`wl-btn ${saved ? "saved" : ""}`}
          onClick={(e) => { e.stopPropagation(); onWatchlist(movie); }}
        >
          {saved ? "♥ Saved" : "♡ Save"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
