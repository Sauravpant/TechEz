import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 27.7172, // Kathmandu default
  lng: 85.324,
};

interface MapSelectorProps {
  onLocationChange: (address: string) => void;
}

const MapSelector: React.FC<MapSelectorProps> = ({ onLocationChange }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // or process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [markerPos, setMarkerPos] = useState(defaultCenter);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setMapCenter(coords);
          setMarkerPos(coords);
          reverseGeocode(coords);
        },
        () => {
          // Use default location on error or permission denied
          reverseGeocode(defaultCenter);
        }
      );
    } else {
      reverseGeocode(defaultCenter);
    }
  }, []);

  // Reverse geocode lat/lng to address string
  const reverseGeocode = (coords: { lat: number; lng: number }) => {
    if (!window.google) return;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: coords }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        onLocationChange(results[0].formatted_address);
      } else {
        onLocationChange("");
      }
    });
  };

  const onMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setMarkerPos(newPos);
    reverseGeocode(newPos);
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={15}>
      <Marker position={markerPos} draggable onDragEnd={onMarkerDragEnd} />
    </GoogleMap>
  );
};

export default MapSelector;
