import { useState, useCallback } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

interface LocationMapProps {
  onLocationSelect: (longitude: number, latitude: number) => void;
}

export default function LocationMap({ onLocationSelect }: LocationMapProps) {
  const [marker, setMarker] = useState({
    longitude: 144.9631,
    latitude: -37.8136
  });

  const [viewState, setViewState] = useState({
    longitude: 144.9631,
    latitude: -37.8136,
    zoom: 11,
    bearing: 0,
    pitch: 0
  });

  const handleClick = useCallback((event: any) => {
    const { lngLat } = event;
    setMarker({
      longitude: lngLat.lng,
      latitude: lngLat.lat
    });
    onLocationSelect(lngLat.lng, lngLat.lat);
  }, [onLocationSelect]);

  return (
    <div className="relative h-[400px] w-full rounded-lg overflow-hidden border border-gray-200">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapboxAccessToken="pk.eyJ1IjoiaXNhYWNtcCIsImEiOiJjbTJ3dWU1ZnAwYWF1MmlvaDY4dmd6dmNuIn0.V_uCzFC9c_d9_B5jOrsFQA"
        mapStyle="mapbox://styles/mapbox/light-v11"
        onClick={handleClick}
        style={{ width: '100%', height: '100%' }}
      >
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="bottom"
        >
          <MapPin className="w-6 h-6 text-blue-600" />
        </Marker>
      </Map>
    </div>
  );
}