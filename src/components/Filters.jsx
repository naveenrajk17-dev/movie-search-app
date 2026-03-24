import "./Filters.css";

const TYPES = [
  { value: "", label: "All Types" },
  { value: "movie", label: "Movies" },
  { value: "series", label: "TV Series" },
  { value: "episode", label: "Episodes" },
];

const YEARS = ["All Years", ...Array.from({ length: 35 }, (_, i) => String(2024 - i))];

function Filters({ type, year, onTypeChange, onYearChange }) {
  return (
    <div className="filters">
      {TYPES.map((t) => (
        <button
          key={t.value}
          className={`filter-pill ${type === t.value ? "active" : ""}`}
          onClick={() => onTypeChange(t.value)}
        >
          {t.label}
        </button>
      ))}
      <select
        className="year-select"
        value={year}
        onChange={(e) => onYearChange(e.target.value)}
      >
        {YEARS.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
}

export default Filters;
