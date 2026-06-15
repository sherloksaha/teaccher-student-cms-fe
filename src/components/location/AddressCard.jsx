import {
  Ban,
  LoaderCircle,
  MapPinned,
  MapPinnedIcon,
  Navigation,
  TriangleAlert,
} from 'lucide-react';
import {
  formatCoordinates,
  formatLocationSubtitle,
  formatLocationTitle,
} from '../../utils/locationData';

const statusConfig = {
  idle: {
    icon: MapPinned,
    title: 'No location selected yet',
    body: 'Use current location or search manually to choose a precise address.',
  },
  'requesting-permission': {
    icon: LoaderCircle,
    title: 'Waiting for permission',
    body: 'Approve the browser prompt so we can detect the current address.',
    spin: true,
  },
  locating: {
    icon: Navigation,
    title: 'Fetching your coordinates',
    body: 'We are locating the device and preparing the map preview.',
  },
  'reverse-geocoding': {
    icon: LoaderCircle,
    title: 'Confirming the address',
    body: 'We found coordinates and are turning them into a readable address.',
    spin: true,
  },
  'permission-denied': {
    icon: Ban,
    title: 'Location permission denied',
    body: 'You can still search manually or choose a recent location below.',
    tone: 'error',
  },
  'location-unavailable': {
    icon: TriangleAlert,
    title: 'Current location unavailable',
    body: 'We could not fetch your position right now. Search manually or try again.',
    tone: 'error',
  },
};

export default function AddressCard({ status, location, message }) {
  const resolvedStatus = location ? 'success' : status;
  const config = statusConfig[resolvedStatus] || statusConfig.idle;
  const Icon = config?.icon || MapPinnedIcon;

  if (resolvedStatus === 'success' && location) {
    const subtitle = formatLocationSubtitle(location);

    return (
      <section className="location-flow__panel location-flow__panel--highlight">
        <div className="location-flow__card-badge">Detected address</div>
        <div className="location-flow__address-head">
          <span className="location-flow__address-icon">
            <MapPinnedIcon />
          </span>
          <div>
            <h3 className="location-flow__section-title location-flow__section-title--tight">
              {formatLocationTitle(location)}
            </h3>
            <p className="location-flow__section-copy location-flow__section-copy--tight">
              {subtitle || location.addressLine}
            </p>
          </div>
        </div>

        <div className="location-flow__address-meta">
          <span className="location-flow__status-pill">
            {location.source === 'search' ? 'Selected from search' : 'Current location ready'}
          </span>
          <span className="location-flow__coordinates">{formatCoordinates(location)}</span>
        </div>

        {location.addressLine && location.addressLine !== subtitle ? (
          <p className="location-flow__address-line">{location.addressLine}</p>
        ) : null}
      </section>
    );
  }

  return (
    <section
      className={`location-flow__panel ${
        config?.tone === 'error' ? 'location-flow__panel--error' : ''
      }`}
    >
      <div className="location-flow__state-row">
        <span className="location-flow__state-icon" aria-hidden="true">
          <Icon className={config?.spin ? 'location-flow__spin' : ''} />
        </span>
        <div>
          <h3 className="location-flow__section-title location-flow__section-title--tight">
            {config?.title}
          </h3>
          <p className="location-flow__section-copy location-flow__section-copy--tight">
            {message || config?.body}
          </p>
        </div>
      </div>
    </section>
  );
}
