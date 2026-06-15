import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import CurrentLocationButton from './CurrentLocationButton';
import LocationSearch from './LocationSearch';
import AddressCard from './AddressCard';
import MapPreview from './MapPreview';
import RecentLocationsList from './RecentLocationsList';
import ConfirmLocationFooter from './ConfirmLocationFooter';
import { useLocationStore } from '../../context/LocationContext';
import useDebouncedValue from '../../hooks/useDebouncedValue';
import { normalizeStoredLocation } from '../../utils/locationData';
import { reverseGeocodeLocation, searchLocations } from '../../utils/locationService';

const DEFAULT_STATUS = 'idle';
const FOCUSABLE_SELECTORS =
  'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function LocationPicker({ isOpen, initialLocation, onClose, onConfirm }) {
  const dialogRef = useRef(null);
  const searchInputRef = useRef(null);
  const permissionTimerRef = useRef(null);
  const previousFocusedElementRef = useRef(null);
  const {
    selectedLocation,
    recentLocations,
    confirmLocation: saveConfirmedLocation,
  } = useLocationStore();

  const [candidateLocation, setCandidateLocation] = useState(
    normalizeStoredLocation(initialLocation) || selectedLocation || null,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchState, setSearchState] = useState('idle');
  const [searchError, setSearchError] = useState('');
  const [status, setStatus] = useState(candidateLocation ? 'success' : DEFAULT_STATUS);
  const [statusMessage, setStatusMessage] = useState('');

  const debouncedQuery = useDebouncedValue(searchQuery, 380);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const prefilledLocation = normalizeStoredLocation(initialLocation) || selectedLocation || null;

    previousFocusedElementRef.current = document.activeElement;
    setCandidateLocation(prefilledLocation);
    setStatus(prefilledLocation ? 'success' : DEFAULT_STATUS);
    setStatusMessage('');
    setSearchQuery(prefilledLocation?.label || '');
    setSearchResults([]);
    setSearchState('idle');
    setSearchError('');

    document.body.style.overflow = 'hidden';
    window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 30);

    return () => {
      document.body.style.overflow = '';
      window.clearTimeout(permissionTimerRef.current);
      previousFocusedElementRef.current?.focus?.();
    };
  }, [initialLocation, isOpen, selectedLocation]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return;
      }

      const focusableElements = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE_SELECTORS));

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || debouncedQuery.trim().length < 3) {
      if (!debouncedQuery.trim()) {
        setSearchResults([]);
        setSearchState('idle');
        setSearchError('');
      }

      return undefined;
    }

    const abortController = new AbortController();

    setSearchState('loading');
    setSearchError('');

    searchLocations(debouncedQuery, abortController.signal)
      .then((results) => {
        setSearchResults(results);
        setSearchState('success');
      })
      .catch(() => {
        setSearchState('error');
        setSearchError('Search is unavailable right now. Try current location or a recent address.');
      });

    return () => {
      abortController.abort();
    };
  }, [debouncedQuery, isOpen]);

  if (!isOpen) {
    return null;
  }

  const closePicker = () => {
    onClose();
  };

  const updateLocationFromCoordinates = (coords, source = 'manual') => {
    const abortController = new AbortController();

    setStatus('reverse-geocoding');
    setStatusMessage('Checking the nearest area and matching it to an address.');

    reverseGeocodeLocation(coords, abortController.signal).then((resolvedLocation) => {
      setCandidateLocation({
        ...resolvedLocation,
        source,
      });
      setStatus('success');
      setStatusMessage('');
      setSearchQuery(resolvedLocation.label || resolvedLocation.addressLine || '');
    });
  };

  const handleUseCurrentLocation = () => {
    setStatus('requesting-permission');
    setStatusMessage('');

    if (!navigator.geolocation) {
      setStatus('location-unavailable');
      setStatusMessage('This browser does not support geolocation. Search manually instead.');
      return;
    }

    window.clearTimeout(permissionTimerRef.current);
    permissionTimerRef.current = window.setTimeout(() => {
      setStatus('locating');
    }, 1200);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        window.clearTimeout(permissionTimerRef.current);
        updateLocationFromCoordinates(
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          'geolocation',
        );
      },
      (error) => {
        window.clearTimeout(permissionTimerRef.current);

        if (error.code === error.PERMISSION_DENIED) {
          setStatus('permission-denied');
          setStatusMessage('Permission was denied. Search manually or use a recent location instead.');
          return;
        }

        setStatus('location-unavailable');
        setStatusMessage('We could not fetch your live location. Try again or search manually.');
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0,
      },
    );
  };

  const handleSearchSelect = (location) => {
    setCandidateLocation(location);
    setSearchQuery(location.label || location.addressLine || '');
    setSearchResults([]);
    setSearchState('success');
    setSearchError('');
    setStatus('success');
    setStatusMessage('');
  };

  const handleConfirm = () => {
    if (!candidateLocation) {
      return;
    }

    saveConfirmedLocation(candidateLocation);
    onConfirm(candidateLocation);
    onClose();
  };

  return createPortal(
    <div
      className="location-flow"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closePicker();
        }
      }}
    >
      <div
        ref={dialogRef}
        className="location-flow__sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="location-picker-title"
      >
        <div className="location-flow__handle" />
        <div className="location-flow__header">
          <div>
            <p className="location-flow__eyebrow">Delivery-style location picker</p>
            <h2 id="location-picker-title" className="location-flow__title">
              Choose your location
            </h2>
            <p className="location-flow__subtitle">
              We use your location to show the right tutor availability, match nearby coverage, and
              save a trusted address for future visits.
            </p>
          </div>
          <button
            type="button"
            className="location-flow__close"
            onClick={closePicker}
            aria-label="Close location picker"
          >
            ×
          </button>
        </div>

        <div className="location-flow__scroll">
          <div className="location-flow__layout">
            <div className="location-flow__main">
              <CurrentLocationButton status={status} onClick={handleUseCurrentLocation} />
              <LocationSearch
                inputRef={searchInputRef}
                query={searchQuery}
                onQueryChange={setSearchQuery}
                onClear={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                  setSearchState('idle');
                  setSearchError('');
                }}
                results={searchResults}
                isLoading={searchState === 'loading'}
                errorMessage={searchState === 'error' ? searchError : ''}
                onSelect={handleSearchSelect}
              />
              <RecentLocationsList
                locations={recentLocations}
                onSelect={(location) => {
                  setCandidateLocation(location);
                  setStatus('success');
                  setStatusMessage('');
                  setSearchQuery(location.label || '');
                }}
              />
            </div>

            <div className="location-flow__secondary">
              <AddressCard status={status} location={candidateLocation} message={statusMessage} />
              <MapPreview
                location={candidateLocation}
                isLoading={status === 'locating' || status === 'reverse-geocoding'}
                onLocationChange={(coords) => updateLocationFromCoordinates(coords, 'manual')}
              />
            </div>
          </div>

          <ConfirmLocationFooter
            location={candidateLocation}
            onConfirm={handleConfirm}
            onClose={closePicker}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
