import { LoaderCircle, MapPinHouse, Search, X } from 'lucide-react';
import { formatLocationSubtitle, formatLocationTitle } from '../../utils/locationData';

export default function LocationSearch({
  inputRef,
  query,
  onQueryChange,
  onClear,
  results,
  isLoading,
  errorMessage,
  onSelect,
}) {
  const showTypingHint = query.trim().length > 0 && query.trim().length < 3;

  return (
    <section className="location-flow__panel" aria-labelledby="location-search-title">
      <div className="location-flow__search-header">
        <div>
          <h3 id="location-search-title" className="location-flow__section-title">
            Search area or address
          </h3>
          <p className="location-flow__section-copy">
            Search by locality, landmark, street, or building name.
          </p>
        </div>
      </div>

      <label className="location-flow__search-box" aria-label="Search for location">
        <Search className="location-flow__search-icon" />
        <input
          ref={inputRef}
          type="text"
          className="location-flow__search-input"
          placeholder="Search for locality, area, or address"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          autoComplete="off"
          aria-describedby="location-search-help"
        />
        {query ? (
          <button
            type="button"
            className="location-flow__search-clear"
            onClick={onClear}
            aria-label="Clear location search"
          >
            <X />
          </button>
        ) : null}
      </label>
      <p id="location-search-help" className="location-flow__assistive-copy">
        Results appear as you type. Choose one to update the map preview.
      </p>

      <div className="location-flow__search-results" aria-live="polite">
        {isLoading ? (
          <div className="location-flow__result-state">
            <LoaderCircle className="location-flow__spin" />
            <span>Searching nearby localities...</span>
          </div>
        ) : null}

        {showTypingHint ? (
          <div className="location-flow__hint-card">
            Keep typing to search. Three or more characters works best for address suggestions.
          </div>
        ) : null}

        {errorMessage ? (
          <div className="location-flow__hint-card location-flow__hint-card--error">
            {errorMessage}
          </div>
        ) : null}

        {!isLoading && query.trim().length >= 3 && results.length === 0 && !errorMessage ? (
          <div className="location-flow__hint-card">
            No matching areas found. Try a nearby landmark, neighbourhood, or road name.
          </div>
        ) : null}

        {results.length > 0 ? (
          <ul className="location-flow__result-list">
            {results.map((result) => (
              <li key={result.id}>
                <button
                  type="button"
                  className="location-flow__result-item"
                  onClick={() => onSelect(result)}
                >
                  <span className="location-flow__result-icon">
                    <MapPinHouse />
                  </span>
                  <span className="location-flow__result-copy">
                    <span className="location-flow__result-title">
                      {formatLocationTitle(result)}
                    </span>
                    <span className="location-flow__result-subtitle">
                      {formatLocationSubtitle(result)}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
