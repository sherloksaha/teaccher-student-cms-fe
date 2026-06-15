import { Clock3, Home, MapPinned } from 'lucide-react';
import { formatLocationSubtitle, formatLocationTitle } from '../../utils/locationData';

export default function RecentLocationsList({ locations, onSelect }) {
  return (
    <section className="location-flow__panel" aria-labelledby="recent-locations-title">
      <div className="location-flow__search-header">
        <div>
          <h3 id="recent-locations-title" className="location-flow__section-title">
            Recent & saved
          </h3>
          <p className="location-flow__section-copy">
            Your confirmed locations appear here for faster reuse.
          </p>
        </div>
      </div>

      {locations.length === 0 ? (
        <div className="location-flow__empty-card">
          <MapPinned />
          <div>
            <p className="location-flow__empty-title">No recent locations yet</p>
            <p className="location-flow__empty-copy">
              Once a location is confirmed, it will appear here for one-tap selection.
            </p>
          </div>
        </div>
      ) : (
        <ul className="location-flow__recent-list">
          {locations.map((location, index) => (
            <li key={location.id}>
              <button
                type="button"
                className="location-flow__recent-item"
                onClick={() => onSelect(location)}
              >
                <span className="location-flow__recent-icon">
                  {index === 0 ? <Home /> : <Clock3 />}
                </span>
                <span className="location-flow__recent-copy">
                  <span className="location-flow__recent-title">{formatLocationTitle(location)}</span>
                  <span className="location-flow__recent-subtitle">
                    {formatLocationSubtitle(location)}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
