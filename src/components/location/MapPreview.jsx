import { divIcon } from 'leaflet';
import { useEffect } from 'react';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';

const DEFAULT_CENTER = [28.6139, 77.209];
const DEFAULT_ZOOM = 15;

const locationMarkerIcon = divIcon({
  className: 'location-flow__map-marker-shell',
  html: `
    <div class="location-flow__map-marker">
      <span class="location-flow__map-marker-core"></span>
    </div>
  `,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

function MapViewportController({ center }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom(), {
      animate: true,
      duration: 0.4,
    });
  }, [center, map]);

  return null;
}

function MapSelectionLayer({ onLocationChange }) {
  useMapEvents({
    click(event) {
      onLocationChange({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      });
    },
  });

  return null;
}

export default function MapPreview({ location, isLoading, onLocationChange }) {
  const center = location ? [location.lat, location.lng] : DEFAULT_CENTER;

  return (
    <section className="location-flow__panel location-flow__map-card" aria-labelledby="map-preview-title">
      <div className="location-flow__search-header">
        <div>
          <h3 id="map-preview-title" className="location-flow__section-title">
            Map preview
          </h3>
          <p className="location-flow__section-copy">
            Tap the map or drag the pin to fine-tune the exact drop point.
          </p>
        </div>
      </div>

      <div className={`location-flow__map-frame ${isLoading ? 'location-flow__map-frame--loading' : ''}`}>
        <MapContainer
          center={center}
          zoom={DEFAULT_ZOOM}
          className="location-flow__leaflet-map"
          scrollWheelZoom={false}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <MapViewportController center={center} />
          <MapSelectionLayer onLocationChange={onLocationChange} />
          {location ? (
            <Marker
              position={[location.lat, location.lng]}
              draggable
              icon={locationMarkerIcon}
              eventHandlers={{
                dragend(event) {
                  const markerPosition = event.target.getLatLng();
                  onLocationChange({
                    lat: markerPosition.lat,
                    lng: markerPosition.lng,
                  });
                },
              }}
            />
          ) : null}
        </MapContainer>
        {isLoading ? <div className="location-flow__map-overlay">Updating map preview…</div> : null}
      </div>

      <p className="location-flow__map-credit">
        Map tiles by OpenStreetMap contributors. For production scale, proxy geocoding through your
        Express backend to control retries and rate limits.
      </p>
    </section>
  );
}
