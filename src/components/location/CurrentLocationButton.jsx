import { Crosshair, LoaderCircle } from 'lucide-react';

const statusCopy = {
  idle: {
    title: 'Use current location',
    subtitle: 'Detect your device location and confirm the address',
  },
  'requesting-permission': {
    title: 'Waiting for permission',
    subtitle: 'Approve the location prompt in your browser to continue',
  },
  locating: {
    title: 'Finding your location',
    subtitle: 'Hold on while we lock your current position',
  },
  'reverse-geocoding': {
    title: 'Verifying address',
    subtitle: 'Turning coordinates into a readable address',
  },
};

export default function CurrentLocationButton({ status, onClick }) {
  const copy = statusCopy[status] || statusCopy.idle;
  const isLoading =
    status === 'requesting-permission' || status === 'locating' || status === 'reverse-geocoding';

  return (
    <button
      type="button"
      className="location-flow__current-button"
      onClick={onClick}
      disabled={isLoading}
      aria-live="polite"
    >
      <span className="location-flow__current-icon" aria-hidden="true">
        {isLoading ? <LoaderCircle className="location-flow__spin" /> : <Crosshair />}
      </span>
      <span className="location-flow__current-copy">
        <span className="location-flow__current-title">{copy.title}</span>
        <span className="location-flow__current-subtitle">{copy.subtitle}</span>
      </span>
    </button>
  );
}
