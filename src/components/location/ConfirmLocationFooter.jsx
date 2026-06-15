import { MapPinned } from 'lucide-react';
import { formatLocationSubtitle, formatLocationTitle } from '../../utils/locationData';

export default function ConfirmLocationFooter({ location, onConfirm, onClose }) {
  return (
    <div className="location-flow__footer">
      <div className="location-flow__footer-summary">
        <span className="location-flow__footer-icon">
          <MapPinned />
        </span>
        <div>
          <p className="location-flow__footer-label">
            {location ? 'Ready to confirm' : 'Choose a location first'}
          </p>
          <p className="location-flow__footer-title">
            {location ? formatLocationTitle(location) : 'Search or detect your address'}
          </p>
          <p className="location-flow__footer-copy">
            {location
              ? formatLocationSubtitle(location) || location.addressLine
              : 'You can use current location, search manually, or pick from recent locations.'}
          </p>
        </div>
      </div>

      <div className="location-flow__footer-actions">
        <button
          type="button"
          className="location-flow__button location-flow__button--secondary"
          onClick={onClose}
        >
          Change later
        </button>
        <button
          type="button"
          className="location-flow__button location-flow__button--primary"
          onClick={onConfirm}
          disabled={!location}
        >
          Confirm location
        </button>
      </div>
    </div>
  );
}
