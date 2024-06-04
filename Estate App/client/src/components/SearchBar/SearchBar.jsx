import { useState } from "react";
import "./searchBar.scss";
function SearchBar() {
  const types = ["buy", "rent"];
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery({ ...query, type: val });
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="City Location"
        />
        <input
          type="number"
          name="min-price"
          id="min-price"
          min={0}
          max={10000000}
          placeholder="Min Price"
        />
        <input
          type="number"
          name="max-price"
          id="max-price"
          min={0}
          max={10000000}
          placeholder="Max Price"
        />
        <button>
          <img src="/search.png" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
